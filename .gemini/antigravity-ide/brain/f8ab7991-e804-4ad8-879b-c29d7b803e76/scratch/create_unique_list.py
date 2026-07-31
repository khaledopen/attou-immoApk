import json

INPUT_FILE = r"C:\Users\KT156S\.gemini\antigravity-ide\brain\f8ab7991-e804-4ad8-879b-c29d7b803e76\scratch\comments.json"
OUTPUT_FILE = r"C:\Users\KT156S\.gemini\antigravity-ide\brain\f8ab7991-e804-4ad8-879b-c29d7b803e76\scratch\unique_comments.json"

with open(INPUT_FILE, 'r', encoding='utf-8') as f:
    data = json.load(f)

unique_comments = sorted(list({comment['text'] for file_path, comments in data.items() for comment in comments}))

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    json.dump(unique_comments, f, ensure_ascii=False, indent=2)

print(f"Saved {len(unique_comments)} unique comments to {OUTPUT_FILE}")
