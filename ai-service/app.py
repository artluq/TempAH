from flask import Flask, request, jsonify
from flask_cors import CORS
from ai import analyze_car_issue

app = Flask(__name__)
CORS(app)

@app.route('/diagnose', methods=['POST'])
def diagnose():
    try:
        data = request.json
        problem_description = data.get('problemDescription', '')

        # Format the problem description as responses dict
        responses = {
            "Can you describe the problem you're experiencing with your car?": problem_description
        }

        analysis = analyze_car_issue(responses)
        return jsonify({"analysis": analysis})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)