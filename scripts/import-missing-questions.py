#!/usr/bin/env python3
"""
Parse the missing reflection questions from the xlsx spreadsheet
and merge them into curriculum-template-fixed.csv.

Usage:
    python3 scripts/import-missing-questions.py [xlsx-path] [fixed-csv-path]
"""

import sys
import os
import re
import csv

try:
    import openpyxl
except ImportError:
    print("Error: openpyxl is required. Install with: pip3 install openpyxl")
    sys.exit(1)

XLSX_PATH = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser(
    "~/Downloads/Tune_My_Heart_Reflection_Questions_Weeks_11-20.xlsx"
)
FIXED_CSV_PATH = sys.argv[2] if len(sys.argv) > 2 else "curriculum-template-fixed.csv"


def parse_xlsx(xlsx_path):
    """Parse the xlsx and return a dict mapping day_number -> formatted questions string."""
    wb = openpyxl.load_workbook(xlsx_path)
    ws = wb.active

    questions_by_day = {}
    current_day = None
    current_questions = {}

    for row in ws.iter_rows(min_row=2, values_only=True):  # skip header
        week, day_title, reading, q_num, question = row

        # If we have a new day title, extract the day number
        if day_title:
            # Save previous day's questions
            if current_day and current_questions:
                questions_by_day[current_day] = format_questions(current_questions)

            # Extract day number from "Day 51: Balaam and the Donkey"
            match = re.search(r"Day\s+(\d+)", day_title)
            if match:
                current_day = int(match.group(1))
                current_questions = {}

        # Add this question
        if q_num and question:
            current_questions[int(q_num)] = question.strip()

    # Save last day
    if current_day and current_questions:
        questions_by_day[current_day] = format_questions(current_questions)

    return questions_by_day


def format_questions(questions_dict):
    """Format questions dict {1: 'Q1', 2: 'Q2', 3: 'Q3'} into '1. Q1 2. Q2 3. Q3'."""
    parts = []
    for num in sorted(questions_dict.keys()):
        parts.append(f"{num}. {questions_dict[num]}")
    return " ".join(parts)


def merge_into_csv(questions_by_day, csv_path):
    """Read the fixed CSV, insert questions for rows 51-100, write back."""
    # Read all rows
    rows = []
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames
        for row in reader:
            rows.append(row)

    # Merge questions
    merged_count = 0
    for i, row in enumerate(rows):
        row_num = i + 1  # 1-indexed
        day_num = row_num  # row number corresponds to absolute day number
        if day_num in questions_by_day:
            old_q = (row.get("questions") or "").strip()
            if not old_q:  # Only fill in if currently empty
                row["questions"] = questions_by_day[day_num]
                merged_count += 1
                print(f"  Row {row_num}: Inserted questions for Day {day_num}")
            else:
                print(f"  Row {row_num}: Already has questions, skipping")

    # Write back
    with open(csv_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    return merged_count


def main():
    print(f"\n📥 Import Missing Questions from XLSX")
    print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    print(f"XLSX:      {XLSX_PATH}")
    print(f"Fixed CSV: {FIXED_CSV_PATH}\n")

    if not os.path.exists(XLSX_PATH):
        print(f"Error: XLSX not found: {XLSX_PATH}")
        sys.exit(1)
    if not os.path.exists(FIXED_CSV_PATH):
        print(f"Error: Fixed CSV not found: {FIXED_CSV_PATH}")
        sys.exit(1)

    # Parse xlsx
    questions = parse_xlsx(XLSX_PATH)
    print(f"Parsed {len(questions)} days from XLSX (Days {min(questions.keys())}-{max(questions.keys())})\n")

    # Preview first few
    print("Preview:")
    for day_num in sorted(list(questions.keys()))[:3]:
        print(f"  Day {day_num}: {questions[day_num][:100]}...")
    print()

    # Merge
    merged = merge_into_csv(questions, FIXED_CSV_PATH)

    # Count coverage
    with open(FIXED_CSV_PATH, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        total = 0
        with_q = 0
        without_q = 0
        for row in reader:
            total += 1
            if (row.get("questions") or "").strip():
                with_q += 1
            else:
                without_q += 1

    print(f"\n✅ Merged {merged} question sets into fixed CSV")
    print(f"\n📊 Coverage: {with_q}/{total} rows have questions ({without_q} still empty)")

    if without_q == 0:
        print(f"\n🎉 All {total} rows now have reflection questions!")
        print(f"\n📋 Next steps:")
        print(f"  1. Run: node scripts/audit-questions.cjs curriculum-template-fixed.csv  (to verify)")
        print(f"  2. Back up original: cp curriculum-template.csv curriculum-template.csv.bak")
        print(f"  3. Replace: cp curriculum-template-fixed.csv curriculum-template.csv")
        print(f"  4. Run: node scripts/import-curriculum.cjs curriculum-template.csv  (to import to Firestore)")


if __name__ == "__main__":
    main()
