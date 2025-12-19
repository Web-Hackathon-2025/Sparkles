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

# --- Bookings Routes ---

BOOKINGS_FILE = os.path.join(os.path.dirname(__file__), 'bookings.json')

def load_bookings():
    """Helper to load bookings from JSON file."""
    if not os.path.exists(BOOKINGS_FILE):
        return []
    with open(BOOKINGS_FILE, 'r') as f:
        return json.load(f)

def save_bookings(bookings):
    """Helper to save bookings to JSON file."""
    with open(BOOKINGS_FILE, 'w') as f:
        json.dump(bookings, f, indent=2)

@app.route('/bookings', methods=['GET'])
def get_bookings():
    """Return all bookings."""
    bookings = load_bookings()
    return jsonify(bookings)

@app.route('/bookings', methods=['POST'])
def create_booking():
    """Create a new booking."""
    from flask import request
    data = request.get_json()
    
    if not data or not 'providerId' in data or not 'customerName' in data:
        abort(400, description="Missing required fields")

    bookings = load_bookings()
    
    # Generate new ID
    new_id = max([b['id'] for b in bookings]) + 1 if bookings else 1
    
    new_booking = {
        "id": new_id,
        "providerId": data['providerId'],
        "customerName": data['customerName'],
        "service": data.get('service', 'General Service'),
        "date": data.get('date', 'TBD'),
        "status": "requested" 
    }
    
    bookings.append(new_booking)
    save_bookings(bookings)
    
    return jsonify(new_booking), 201

@app.route('/bookings/<int:booking_id>', methods=['PATCH'])
def update_booking(booking_id):
    """Update a booking status."""
    from flask import request
    data = request.get_json()
    
    bookings = load_bookings()
    booking = next((b for b in bookings if b['id'] == booking_id), None)
    
    if not booking:
        abort(404, description="Booking not found")
        
    if 'status' in data:
        booking['status'] = data['status']
        
    save_bookings(bookings)
    return jsonify(booking)

if __name__ == '__main__':
    # Run the app on port 5000
    app.run(debug=True, port=5000)
