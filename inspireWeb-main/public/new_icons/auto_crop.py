import os
from PIL import Image

icons = ['8.png', '9.png', '10.png', '11.png', '12.png']

for icon in icons:
    if os.path.exists(icon):
        img = Image.open(icon).convert("RGBA")
        bbox = img.getbbox()
        if bbox:
            cropped_img = img.crop(bbox)
            cropped_img.save(icon)
            print(f"Auto-cropped {icon}: original size {img.size}, new size {cropped_img.size}")
        else:
            print(f"Could not find bounding box for {icon}")
