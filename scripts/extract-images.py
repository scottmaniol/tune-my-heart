#!/usr/bin/env python3
"""
Extract images from Children's Bible PDF
Requires: pip3 install PyMuPDF Pillow
"""

import sys
import os

try:
    import fitz  # PyMuPDF
    from PIL import Image
    import io
except ImportError:
    print("❌ Required packages not installed")
    print("📦 Run: pip3 install PyMuPDF Pillow")
    sys.exit(1)

# Paths
pdf_path = "childrens–bible.pdf"
output_dir = "public/childrens-bible/images"

print("📖 Children's Bible Image Extractor")
print("=" * 50)

# Create output directory
os.makedirs(output_dir, exist_ok=True)
print(f"✅ Output directory: {output_dir}\n")

# Open PDF
try:
    doc = fitz.open(pdf_path)
    print(f"📄 Opened PDF: {len(doc)} pages\n")
except Exception as e:
    print(f"❌ Error opening PDF: {e}")
    sys.exit(1)

# Extract images
story_num = 0  # Start at 0 to skip first 3 images
extracted_count = 0
skip_first = 3  # Skip cover/intro pages

print("🖼️  Extracting images (skipping first 3 intro pages)...")
print("-" * 50)

for page_num in range(len(doc)):
    page = doc[page_num]
    image_list = page.get_images()
    
    # Skip pages without images or with very small images
    if not image_list:
        continue
    
    for img_index, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        # Load image to check dimensions
        img_pil = Image.open(io.BytesIO(image_bytes))
        width, height = img_pil.size
        
        # Only save reasonably sized images (likely the illustrations)
        # Skip very small images (like decorative elements)
        if width < 100 or height < 100:
            continue
        
        # Count total images found
        story_num += 1
        
        # Skip first 3 images (cover/intro)
        if story_num <= skip_first:
            print(f"⏭️  Skipping intro image {story_num}: {width}x{height}px - Page {page_num + 1}")
            continue
        
        # Convert CMYK to RGB if needed (for PNG compatibility)
        if img_pil.mode == 'CMYK':
            img_pil = img_pil.convert('RGB')
        
        # Calculate actual story number (subtract skipped images)
        actual_story_num = story_num - skip_first
        
        # Save image
        output_path = f"{output_dir}/story-{actual_story_num:02d}.png"
        
        # Always save as PNG
        img_pil.save(output_path, "PNG")
        
        print(f"✅ Story {actual_story_num:02d}: {width}x{height}px - Page {page_num + 1}")
        extracted_count += 1
        
        # Stop after 53 stories
        if actual_story_num >= 53:
            break
    
    # Stop if we've extracted 53 stories
    if extracted_count >= 53:
        break

doc.close()

print("-" * 50)
print(f"\n🎉 Extraction Complete!")
print(f"   Extracted: {extracted_count} images")
print(f"   Location: {output_dir}/")
print(f"\n💡 Images are named: story-01.png through story-{extracted_count:02d}.png")
