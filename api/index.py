import sys
import os

# Add the root directory and backend directory to the Python path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
backend_dir = os.path.join(root_dir, "backend")

if root_dir not in sys.path:
    sys.path.append(root_dir)
if backend_dir not in sys.path:
    sys.path.append(backend_dir)

try:
    from backend.app.main import app
except ImportError:
    try:
        from app.main import app
    except ImportError as e:
        print(f"Vercel Index: FINAL IMPORT ERROR - {e}")
        raise e

# The entry point for Vercel is 'app'
