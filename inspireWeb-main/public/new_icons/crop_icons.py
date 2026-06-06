import os
from PIL import Image

icons = ['11.png', '7.png', '8.png', '9.png', '10.png']

for icon in icons:
    if os.path.exists(icon):
        img = Image.open(icon)
        width, height = img.size
        # Crop the bottom 30% (keep the top 70%)
        cropped_img = img.crop((0, 0, width, int(height * 0.75)))
        cropped_img.save(icon)
        print(f"Cropped {icon}: original size {width}x{height}, new size {cropped_img.size}")
