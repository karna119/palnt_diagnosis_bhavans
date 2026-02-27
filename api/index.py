from fastapi import FastAPI
import sys
import os

app = FastAPI()

@app.get("/api/health")
def health():
    return {"status": "ok", "source": "index"}

@app.get("/api/debug")
def debug():
    return {"sys_path": sys.path, "cwd": os.getcwd()}

# Add the project root to sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.append(root_dir)

try:
    from backend.app.main import app as backend_app
    # If successful, we can export it or mount it
    app = backend_app 
except Exception as e:
    @app.get("/api/error")
    def error():
        return {"error": str(e)}
