import os
import glob

replacements = {
    # Backgrounds
    'bg-[#353535]': 'bg-[#181C1A]',
    'from-[#353535]': 'from-[#181C1A]',
    'to-[#353535]': 'to-[#181C1A]',
    
    # Cards
    'bg-[#284B63]': 'bg-[#232926]',
    
    # Texts
    'text-[#FFFFFF]': 'text-[#F4F1DE]',
    'text-[#D9D9D9]': 'text-[#9CAAA1]',
    
    # Borders
    'border-[#284B63]': 'border-[#2E3632]',
    'border-[#3C6E71]': 'border-[#38423E]',
    'border-[#D9D9D9]': 'border-[#9CAAA1]',
    
    # Accents
    'theme-accent': 'camp-accent',
}

files = glob.glob('f:/InspireWeb/cultivate-clone/inspireWeb-main/src/pages/camp/*.tsx')
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Earth & Fire theme applied.")
