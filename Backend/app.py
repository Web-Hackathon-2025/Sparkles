from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for all domains to allow frontend communication
CORS(app)

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

if __name__ == '__main__':
    # Run the app on port 5000
    app.run(debug=True, port=5000)
