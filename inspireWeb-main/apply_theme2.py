import os
import glob

replacements = {
    'bg-[#0F120A]': 'bg-[#353535]',
    'bg-[#181D10]': 'bg-[#284B63]',
    'from-[#0F120A]': 'from-[#353535]',
    'to-[#0F120A]': 'to-[#353535]',
    'to-[#0a0c07]': 'to-[#353535]',
    'text-[#E8ECD7]': 'text-[#FFFFFF]',
    'text-[#BCC5B1]': 'text-[#D9D9D9]',
    'text-[#9CA691]': 'text-[#D9D9D9]',
    'text-[#7D8672]': 'text-[#D9D9D9]',
    'border-[#262E1A]': 'border-[#284B63]',
    'bg-[#262E1A]': 'bg-[#284B63]',
    'border-[#3D4A29]': 'border-[#3C6E71]',
    'border-[#556639]': 'border-[#3C6E71]',
    'border-[#BCC5B1]': 'border-[#D9D9D9]',
    'mocha-accent': 'theme-accent',
}

files = glob.glob('f:/InspireWeb/cultivate-clone/inspireWeb-main/src/pages/camp/*.tsx')
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Theme applied.")
