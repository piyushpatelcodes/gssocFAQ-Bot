from flask import Flask, request, jsonify
from faq_matcher import find_best_matches  
import os

app = Flask(__name__)

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get('question')

    if not question:
        return jsonify({'error': 'No question provided'}), 400

    matches = find_best_matches(question, top_n=3, threshold=0.65)

    if not matches:
        return jsonify({'matches': [], 'message': 'No good match found.'})

    return jsonify({'matches': matches})

if __name__ == '__main__':
    # app.run(port=5000)
    port = int(os.environ.get("PORT", 5000))  # fallback to 5000 for local dev
    app.run(host="0.0.0.0", port=port)
