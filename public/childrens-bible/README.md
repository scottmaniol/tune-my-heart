# Children's Bible Images

## Image Extraction from PDF

To extract the 53 illustrations from `childrens–bible.pdf`, you have several options:

### Option 1: Using Adobe Acrobat (Easiest)
1. Open `childrens–bible.pdf` in Adobe Acrobat
2. Go to Tools → Export PDF → Image → PNG or JPEG
3. Click "Export All Images"
4. Save to `public/childrens-bible/images/`
5. Rename files sequentially: `story-01.png`, `story-02.png`, etc.

### Option 2: Using Preview (Mac)
1. Open PDF in Preview
2. View → Thumbnails
3. Select each image page
4. File → Export → PNG
5. Save as `story-01.png`, `story-02.png`, etc.

### Option 3: Using Online Tool
1. Go to https://pdfaid.com/extract-images-pdf
2. Upload `childrens–bible.pdf`
3. Download extracted images
4. Rename and organize into `images/` folder

### Option 4: Python Script (Automated)
```python
# install: pip install PyMuPDF Pillow
import fitz  # PyMuPDF
import os

pdf_path = "childrens–bible.pdf"
output_dir = "public/childrens-bible/images"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
story_num = 1

for page_num in range(len(doc)):
    page = doc[page_num]
    images = page.get_images()
    
    for img_index, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        
        # Save image
        image_path = f"{output_dir}/story-{story_num:02d}.png"
        with open(image_path, "wb") as img_file:
            img_file.write(image_bytes)
        
        story_num += 1

print(f"Extracted {story_num - 1} images!")
```

## File Naming Convention

Images should be named:
- `story-01.png` through `story-53.png`
- PNG or JPG format
- Recommended size: 800-1200px width for web display

## Firebase Storage (Optional)

For better performance, you can upload images to Firebase Storage:

1. Upload images to Firebase Storage at `/childrens-bible/images/`
2. Update `childrensBibleData.ts` with Firebase URLs:
   ```typescript
   imageUrl: "https://firebasestorage.googleapis.com/v0/b/tune-my-heart.firebasestorage.app/o/childrens-bible%2Fimages%2Fstory-01.png?alt=media"
   ```

## Current Status

- ✅ Directory created
- ⏳ Images need to be extracted
- ✅ Data structure ready to receive image URLs
