from flask import Flask, request, jsonify
from flask_cors import CORS
from typing import Dict
from groq import Groq

app = Flask(__name__)
CORS(app, resources={
    r"/diagnose": {
        "origins": ["http://localhost:4200", "http://localhost:5246"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "expose_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

GROQ_API_KEY = "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"  # GROQ API key here

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
    return "Welcome to the Car Diagnostic Service"

@app.route('/diagnose', methods=['POST'])
def diagnose():
    try:
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400

        data = request.json
        if not data or 'problemDescription' not in data:
            return jsonify({"error": "Missing problemDescription in request"}), 400

        problem_description = data['problemDescription']
        if not problem_description:
            return jsonify({"error": "problemDescription cannot be empty"}), 400

        responses = {
            "Can you describe the problem you're experiencing with your car?": problem_description
        }

        analysis = analyze_car_issue(responses)  # Directly calling the function
        return jsonify({"analysis": analysis, "success": True})
    except Exception as e:
        print(f"Error in diagnose endpoint: {str(e)}")  # Debug logging
        return jsonify({"error": str(e), "success": False}), 500

if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5000")  # Debug logging
    app.run(port=5000, debug=True)
