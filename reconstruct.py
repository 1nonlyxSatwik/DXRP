import json
import os

files = {}

with open("/Users/s4twik/.gemini/antigravity-ide/brain/fd673d94-47ba-4f77-80f3-4294b1d11fc7/.system_generated/logs/transcript.jsonl", "r") as f:
    for line in f:
        step = json.loads(line)
        if step.get("type") == "USER_INPUT" and "Codebase cleanup, refactor, and scalability pass" in step.get("content", ""):
            print("Found refactor prompt at step", step.get("step_index"))
            break
            
        if "tool_calls" in step:
            for tc in step["tool_calls"]:
                if tc.get("name") == "write_to_file":
                    args = tc.get("args", {})
                    if isinstance(args, str):
                        try:
                            args = json.loads(args)
                        except:
                            continue
                    path = args.get("TargetFile")
                    if path:
                        files[path] = args.get("CodeContent", "")
                
                elif tc.get("name") == "multi_replace_file_content" or tc.get("name") == "replace_file_content":
                    args = tc.get("args", {})
                    if isinstance(args, str):
                        try:
                            args = json.loads(args)
                        except:
                            continue
                    path = args.get("TargetFile")
                    if path and path in files:
                        content = files[path]
                        chunks = args.get("ReplacementChunks", [])
                        if not chunks and tc.get("name") == "replace_file_content":
                            chunks = [args]
                            
                        if isinstance(chunks, str):
                            try:
                                chunks = json.loads(chunks)
                            except:
                                chunks = []
                                
                        if not isinstance(chunks, list):
                            continue
                            
                        # Filter out invalid chunks
                        valid_chunks = [c for c in chunks if isinstance(c, dict) and "StartLine" in c and "EndLine" in c and "ReplacementContent" in c]
                        
                        valid_chunks = sorted(valid_chunks, key=lambda x: int(x.get("StartLine", 0)), reverse=True)
                        lines = content.split('\n')
                        for chunk in valid_chunks:
                            start = int(chunk["StartLine"]) - 1
                            end = int(chunk["EndLine"])
                            replacement = chunk["ReplacementContent"].split('\n')
                            lines = lines[:start] + replacement + lines[end:]
                        files[path] = '\n'.join(lines)

# Now write them to disk
for path, content in files.items():
    if "/Users/s4twik/Desktop/sat_kart/DXRP/src/" in path:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w") as f:
            f.write(content)
        print(f"Reconstructed {path}")

