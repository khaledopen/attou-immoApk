import os
import re
import json

WORKSPACE = r"c:\Users\KT156S\Desktop\AttouHome"
OUTPUT_FILE = r"C:\Users\KT156S\.gemini\antigravity-ide\brain\f8ab7991-e804-4ad8-879b-c29d7b803e76\scratch\comments.json"

IGNORE_DIRS = {
    'node_modules', '.git', '.expo', 'public', 'build', '.next', 'dist', 
    '.idea', '.vscode', 'assets', 'node_modules', 'soutenance_prep.pdf'
}

# Regex pour trouver les commentaires de bloc : /* ... */
js_block_comment_rx = re.compile(r'(/\*[\s\S]*?\*/)')

# Regex pour trouver les commentaires sur une seule ligne : // ... (éviter de faire correspondre :// pour les URL)
js_line_comment_rx = re.compile(r'(?<!:)(//.*)')

# Regex pour trouver les commentaires de bloc Python : """ ... """ ou ''' ... '''
py_block_comment_rx = re.compile(r'(\"\"\"[\s\S]*?\"\"\"|\'\'\'[\s\S]*?\'\'\')')

# Regex pour trouver les commentaires sur une seule ligne Python : # ... (éviter de faire correspondre # dans les couleurs hexadécimales comme "#ffffff")
py_line_comment_rx = re.compile(r'(?<![\"\'])(#(?![a-fA-F0-9]{6}|[a-fA-F0-9]{3}\b).*)$')

def clean_comment_text(comment, is_block):
    # Supprimer les marqueurs pour voir le texte réel
    text = comment
    if is_block:
        if text.startswith('/*') and text.endswith('*/'):
            text = text[2:-2]
        elif text.startswith('"""') and text.endswith('"""'):
            text = text[3:-3]
        elif text.startswith("'''") and text.endswith("'''"):
            text = text[3:-3]
    else:
        if text.startswith('//'):
            text = text[2:]
        elif text.startswith('#'):
            text = text[1:]
    return text.strip()

def has_letters(text):
    return any(c.isalpha() for c in text)

def extract_comments_from_file(file_path):
    ext = os.path.splitext(file_path)[1].lower()
    comments = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return []
        
    if ext in ['.js', '.jsx', '.ts', '.tsx']:
        # 1. Extraire les commentaires de bloc
        blocks = js_block_comment_rx.findall(content)
        for b in blocks:
            raw = b[0] if isinstance(b, tuple) else b
            text = clean_comment_text(raw, True)
            if has_letters(text):
                comments.append({
                    "raw": raw,
                    "text": text,
                    "type": "block"
                })
        # 2. Extraire les commentaires de ligne
        lines = js_line_comment_rx.findall(content)
        for l in lines:
            raw = l[0] if isinstance(l, tuple) else l
            text = clean_comment_text(raw, False)
            # Filtrer les commentaires qui ne sont que des délimiteurs ou des URL
            if has_letters(text) and not text.startswith('/') and 'http' not in raw:
                comments.append({
                    "raw": raw,
                    "text": text,
                    "type": "line"
                })
                
    elif ext == '.py':
        # 1. Extraire les commentaires de bloc Python
        blocks = py_block_comment_rx.findall(content)
        for b in blocks:
            raw = b[0] if isinstance(b, tuple) else b
            text = clean_comment_text(raw, True)
            if has_letters(text):
                comments.append({
                    "raw": raw,
                    "text": text,
                    "type": "block"
                })
        # 2. Extraire les commentaires de ligne Python
        # Traiter ligne par ligne pour être sûr avec les commentaires python
        lines = content.splitlines()
        for idx, line in enumerate(lines):
            match = py_line_comment_rx.search(line)
            if match:
                raw = match.group(1)
                text = clean_comment_text(raw, False)
                if has_letters(text) and 'http' not in raw:
                    comments.append({
                        "raw": raw,
                        "text": text,
                        "type": "line"
                    })
                    
    return comments

def main():
    results = {}
    count = 0
    
    for root, dirs, files in os.walk(WORKSPACE):
        # Filtrer les répertoires sur place
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in ['.js', '.jsx', '.ts', '.tsx', '.py']:
                file_path = os.path.join(root, file)
                # Passer les fichiers dans les répertoires ignorés que os.walk pourrait encore visiter
                if any(x in file_path for x in IGNORE_DIRS):
                    continue
                file_comments = extract_comments_from_file(file_path)
                if file_comments:
                    relative_path = os.path.relpath(file_path, WORKSPACE)
                    results[file_path] = file_comments
                    count += len(file_comments)
                    
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
        
    print(f"Extraction complete. Found {count} comments across {len(results)} files.")
    print(f"Results written to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
