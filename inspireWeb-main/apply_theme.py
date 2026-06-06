import os
import glob

replacements = {
    'bg-[#121C26]': 'bg-[#0F120A]',
    'bg-[#202D3B]': 'bg-[#181D10]',
    'from-[#121C26]': 'from-[#0F120A]',
    'to-slate-900': 'to-[#0a0c07]',
    'text-slate-50': 'text-[#E8ECD7]',
    'text-slate-300': 'text-[#BCC5B1]',
    'text-slate-400': 'text-[#9CA691]',
    'text-slate-500': 'text-[#7D8672]',
    'border-slate-800': 'border-[#262E1A]',
    'bg-slate-800': 'bg-[#262E1A]',
    'border-slate-600': 'border-[#3D4A29]',
    'border-slate-400': 'border-[#556639]',
    'border-slate-300': 'border-[#BCC5B1]',
    'deepsea-300': 'mocha-accent',
}

files = glob.glob('f:/InspireWeb/cultivate-clone/inspireWeb-main/src/pages/camp/*.tsx')
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Theme applied to Camp files.")
