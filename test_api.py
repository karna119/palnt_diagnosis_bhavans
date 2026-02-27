import requests

def test_api():
    base_url = "http://localhost:8000/api"
    print(f"Testing API at {base_url}...")
    
    # 1. Health check
    try:
        resp = requests.get(f"{base_url}/health")
        print(f"Health check: {resp.status_code} - {resp.json()}")
    except Exception as e:
        print(f"Health check failed: {e}")
        return

    # 2. Registration
    user_data = {
        "name": "Expert Tester",
        "email": "tester@bhavans.edu",
        "phone": "9876543210"
    }
    try:
        resp = requests.post(f"{base_url}/register", json=user_data)
        print(f"Registration: {resp.status_code} - {resp.json()}")
    except Exception as e:
        print(f"Registration failed: {e}")

if __name__ == "__main__":
    test_api()
