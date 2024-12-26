from flask import Flask, request, jsonify
from flask_cors import CORS
from typing import Dict
from groq import Groq
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Read the GROQ API key from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY environment variable is not set")

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:4200", "http://localhost:5246"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Authentication"],
        "expose_headers": ["Content-Type"],
        "supports_credentials": True,
        "allow_credentials": True
    }
})


def analyze_car_issue(responses: Dict) -> str:
    # Initialize Groq client
    client = Groq(api_key=GROQ_API_KEY)

    # Combine all responses into a single context
    context = "\n".join([f"Q: {q}\nA: {a}" for q, a in responses.items()])

    # Initialize the AI model
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert car mechanic. Analyze the symptoms and provide a professional diagnostic assessment."
                },
                {
                    "role": "user",
                    "content": f"""
Based on these car symptoms, provide a diagnostic analysis:

{context}

Please provide your analysis in this format:
1. Main Issues: (List the most likely problems)
2. Next Steps: (List immediate actions needed)
3. Severity: (Rate as Low/Medium/High and explain why)
4. Professional Help: (Whether a mechanic is needed and why)
"""
                }
            ],
            model="llama3-8b-8192",  # Using Llama 3 8B model straight from groq
            temperature=0.7,
            max_tokens=1000
        )

        # Extract and return the response
        if chat_completion.choices:
            return chat_completion.choices[0].message.content
        return "Error: No response generated"

    except Exception as e:
        error_msg = str(e)
        print(f"Debug - Error details: {error_msg}")
        return f"Error analyzing responses: {error_msg}"


@app.route('/')
def home():
    return "Welcome to the AI Car Diagnostic Service"


@app.route('/diagnose', methods=['POST'])
def diagnose():
    try:
        print("Received request at /diagnose endpoint")
        
        if not request.is_json:
            print("Request is not JSON")
            return jsonify({"success": False, "errorMessage": "Content-Type must be application/json"}), 400

        data = request.json
        print(f"Received data: {data}")
        
        if not data or 'Responses' not in data:
            print("Missing Responses in data")
            return jsonify({"success": False, "errorMessage": "Missing Responses in request"}), 400

        responses = data['Responses']
        print(f"Processing responses: {responses}")
        
        analysis = analyze_car_issue(responses)
        print(f"Analysis result: {analysis}")
        
        response = jsonify({
            "success": True,
            "analysis": analysis
        })
        print(f"Sending response: {response.get_data(as_text=True)}")
        return response
        
    except Exception as e:
        print(f"Error in diagnose endpoint: {str(e)}")
        return jsonify({
            "success": False,
            "errorMessage": str(e)
        }), 500


if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5000")  # Debug logging
    app.run(port=5000, debug=True)
