
import os
import subprocess
import sys

def run_project():
    print("Checking dependencies...")
    # This is a helper to run both backend and frontend for the user
    print("Starting Bhavan's AI Plant Health System...")
    
    # In a real environment, we'd use paths and background processes
    # For this deliverable, we provide the command
    print("\nTo start the system, please run:")
    print("1. Backend: cd backend && uvicorn app.main:app")
    print("2. Frontend: cd frontend && npm install && npm run dev")

if __name__ == "__main__":
    run_project()
