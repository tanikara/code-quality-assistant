import json
import subprocess
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 🔹 Ενεργοποίηση CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Μπορείς να το περιορίσεις σε ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Επιτρέπει όλα τα HTTP methods (POST, GET, OPTIONS, κλπ.)
    allow_headers=["*"],  # Επιτρέπει όλα τα headers
)

class CodeInput(BaseModel):
    language: str
    code: str

@app.post("/analyze/")
def analyze_code(input_data: CodeInput):
    try:
        if input_data.language == "python":
            filename = "temp_code.py"
            linter_cmd = ["pylint", filename, "--disable=R,C"]
        elif input_data.language == "javascript":
            filename = "temp_code.js"
            linter_cmd = ["eslint", filename, "--format=json"]
        else:
            raise HTTPException(status_code=400, detail="Unsupported language")

        with open(filename, "w") as f:
            f.write(input_data.code)

        result = subprocess.run(linter_cmd, capture_output=True, text=True)

        if input_data.language == "javascript":
            try:
                eslint_output = json.loads(result.stdout)  # Μετατροπή JSON σε Python αντικείμενο
                formatted_output = [
                    {
                        "message": msg["message"],
                        "line": msg["line"],
                        "severity": "error" if msg["severity"] == 2 else "warning",
                    }
                    for file in eslint_output
                    for msg in file.get("messages", [])
                ]
            except json.JSONDecodeError:
                formatted_output = ["Error decoding ESLint output"]
        else:
            formatted_output = [
                {"message": line.strip()} for line in result.stdout.strip().split("\n") if line.strip()
            ]

        return {
            "language": input_data.language,
            "analysis": formatted_output
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
