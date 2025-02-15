# app.py
import os
import requests
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Get the Gemini API key from an environment variable
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "-----------------")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json['message']
    gemini_response = call_gemini_api(user_input)
    return jsonify({'response': gemini_response})


def call_gemini_api(prompt):
    try:
        data = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.9,
                "topP": 1,
                "topK": 1,
                "maxOutputTokens": 2048,
            },
        }
        params = {"key": GEMINI_API_KEY}
        response = requests.post(GEMINI_API_URL, json=data, params=params)

        if response.status_code == 200:
            response_json = response.json()
            candidates = response_json.get("candidates", [])
            if candidates:
                content = candidates[0].get("content", {})
                parts = content.get("parts", [])
                if parts:
                    text = parts[0].get("text", "Sorry, I couldn't generate a response.")
                    return text
            return "Sorry, I couldn't generate a response."
        else:
            return f"Error: Received status code {response.status_code}"
    except Exception as e:
        return f"Gemini error: {str(e)}"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
