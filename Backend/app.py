from flask import Flask, jsonify, abort
from flask_cors import CORS
import json
import os

app = Flask(__name__)
# Enable CORS for all domains to allow frontend communication
CORS(app)

DATA_FILE = os.path.join(os.path.dirname(__file__), 'providers.json')

def load_providers():
    """Helper to load providers from the JSON file."""
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

@app.route('/health', methods=['GET'])
def health_check():
    """
    Simple health check endpoint to verify backend is running.
    """
    return jsonify({
        "status": "ok",
        "service": "Karigar API",
        "version": "1.0.0"
    })

@app.route('/providers', methods=['GET'])
def get_providers():
    """Return all providers."""
    providers = load_providers()
    return jsonify(providers)

@app.route('/providers/<int:provider_id>', methods=['GET'])
def get_provider(provider_id):
    """Return a single provider by ID."""
    providers = load_providers()
    provider = next((p for p in providers if p['id'] == provider_id), None)
    
    if provider:
        return jsonify(provider)
    else:
        abort(404, description="Provider not found")

if __name__ == '__main__':
    # Run the app on port 5000
    app.run(debug=True, port=5000)
