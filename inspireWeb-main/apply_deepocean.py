import os
import glob

replacements = {
    'bg-[#121C26]': 'bg-[#0A111F]',
    'from-[#121C26]': 'from-[#0A111F]',
    'to-[#121C26]': 'to-[#0A111F]',
    'bg-[#202D3B]': 'bg-[#052243]',
    'text-slate-50': 'text-white',
    'text-slate-300': 'text-[#E0F0F8]',
    'text-slate-400': 'text-[#A0C4D8]',
    'border-slate-800': 'border-[#082E5C]',
    'bg-slate-800': 'bg-[#082E5C]',
    'border-slate-600': 'border-[#10568C]',
    'border-slate-400': 'border-[#157A9E]',
}

files = glob.glob('f:/InspireWeb/cultivate-clone/inspireWeb-main/src/pages/camp/*.tsx')
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Deep Ocean Blue theme applied.")
