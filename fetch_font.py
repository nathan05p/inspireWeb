import urllib.request
import re
import urllib.parse
import zipfile
import io
import os

def download_font():
    print("Fetching font page...")
    req = urllib.request.Request('https://fontesk.com/pavot-font/', headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
    except Exception as e:
        print("Failed to fetch font page:", e)
        return

    # Find the download URL, it usually looks like https://fontesk.com/download/156998/
    m = re.search(r'href="(https://fontesk\.com/download/\d+/)"', html)
    if not m:
        print("Download link not found.")
        return

    download_page_url = m.group(1)
    print("Found download page:", download_page_url)
    
    # Fontesk download pages auto-redirect to the actual zip or have a direct link
    req2 = urllib.request.Request(download_page_url, headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'https://fontesk.com/pavot-font/'})
    try:
        res2 = urllib.request.urlopen(req2)
        zip_data = res2.read()
    except Exception as e:
        print("Failed to download zip:", e)
        return

    print(f"Downloaded {len(zip_data)} bytes. Extracting...")
    
    try:
        z = zipfile.ZipFile(io.BytesIO(zip_data))
    except Exception as e:
        print("Not a valid zip file:", e)
        return

    target_dir = os.path.join("inspireWeb-main", "public", "fonts")
    os.makedirs(target_dir, exist_ok=True)
    
    found_font = False
    for filename in z.namelist():
        if filename.lower().endswith(('.ttf', '.otf', '.woff', '.woff2')) and 'pavot' in filename.lower():
            basename = os.path.basename(filename)
            print(f"Extracting {filename} to {target_dir}/{basename}")
            with open(os.path.join(target_dir, basename), 'wb') as f:
                f.write(z.read(filename))
            found_font = True
            
    if found_font:
        print("Success!")
    else:
        print("No font files found in zip.")

if __name__ == '__main__':
    download_font()
