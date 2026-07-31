import json
import os

INPUT_FILE = r"C:\Users\KT156S\.gemini\antigravity-ide\brain\f8ab7991-e804-4ad8-879b-c29d7b803e76\scratch\comments_translated.json"

def main():
    if not os.path.exists(INPUT_FILE):
        print(f"Error: {INPUT_FILE} does not exist.")
        return

    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)

    updated_files_count = 0
    total_replacements = 0

    for file_path, comments in data.items():
        if not os.path.exists(file_path):
            print(f"Warning: File {file_path} does not exist. Skipping.")
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            continue

        original_content = content
        file_replacements = 0

        # Sort comments by length of raw string descending to avoid substring conflicts during replacement
        sorted_comments = sorted(comments, key=lambda x: len(x['raw']), reverse=True)

        for comment in sorted_comments:
            raw_orig = comment['raw']
            raw_trans = comment['translated_raw']

            if raw_orig != raw_trans:
                if raw_orig in content:
                    content = content.replace(raw_orig, raw_trans)
                    file_replacements += 1
                else:
                    # Try with normalized newlines if not found (CRLF vs LF issues)
                    normalized_orig = raw_orig.replace('\r\n', '\n')
                    normalized_content = content.replace('\r\n', '\n')
                    if normalized_orig in normalized_content:
                        normalized_trans = raw_trans.replace('\r\n', '\n')
                        normalized_content = normalized_content.replace(normalized_orig, normalized_trans)
                        # Convert back to CRLF if the original file had CRLF
                        if '\r\n' in content:
                            content = normalized_content.replace('\n', '\r\n')
                        else:
                            content = normalized_content
                        file_replacements += 1

        if content != original_content:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                updated_files_count += 1
                total_replacements += file_replacements
                print(f"Updated {file_path}: replaced {file_replacements} comments.")
            except Exception as e:
                print(f"Error writing to {file_path}: {e}")

    print(f"\nReplacement process complete. Successfully updated {updated_files_count} files with {total_replacements} total comment translations.")

if __name__ == "__main__":
    main()
