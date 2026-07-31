import json

INPUT_FILE = r"C:\Users\KT156S\.gemini\antigravity-ide\brain\f8ab7991-e804-4ad8-879b-c29d7b803e76\scratch\comments.json"

with open(INPUT_FILE, 'r', encoding='utf-8') as f:
    data = json.load(f)

unique_comments = set()
for file_path, comments in data.items():
    for comment in comments:
        unique_comments.add(comment['text'])

print(f"Total files: {len(data)}")
print(f"Total comments: {sum(len(c) for c in data.values())}")
print(f"Unique comment texts: {len(unique_comments)}")

# Print some of them to see if they look English
english_candidates = []
for c in sorted(list(unique_comments)):
    # Simple check: if it contains typical English words
    words = c.lower().split()
    english_words = {'the', 'and', 'to', 'of', 'in', 'is', 'for', 'on', 'with', 'by', 'at', 'from', 'this', 'setup', 'fetch', 'error', 'user', 'update', 'delete', 'check', 'format'}
    if any(w in english_words for w in words):
        english_candidates.append(c)

print(f"Likely English comments: {len(english_candidates)}")
for idx, c in enumerate(english_candidates[:30]):
    print(f"{idx+1}: {c}")
