import os
from typing import Dict
from groq import Groq

GROQ_API_KEY = "" #GROQ API key here

def car_issue_screening():
    print("Car Issue Screening Questions\n")
    print("Please answer the following questions to help diagnose the issue with your car.\n")

    # Dictionary to store questions and user responses
    responses = {}

    # List of questions
    questions = [
        "Can you describe the problem you're experiencing with your car? (e.g., unusual noises, reduced performance, or warning lights)",
        "When did the issue first start happening?",
        "Does the problem occur consistently or only in certain conditions (e.g., cold weather, after driving for a while, or at certain speeds)?",
        "Have you noticed any unusual sounds, smells, or vibrations? If yes, can you describe them?",
        "Have there been any recent changes in the car's performance, such as difficulty starting, reduced power, or trouble stopping?"
    ]

    # Loop through each question and get user's input
    for question in questions:
        print("\n" + question)
        response = input("Your response: ")
        responses[question] = response

    print("\nThank you for your responses. Here's a summary of your answers:\n")
    for question, answer in responses.items():
        print(f"{question}\n-> {answer}\n")

    return responses

def analyze_car_issue(responses: Dict) -> str:

    #Initialize Groq client
    client = Groq(api_key=GROQ_API_KEY)

    #Combine all responses into a single contex
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


def main():
    #Get user responses
    try:
        responses = car_issue_screening()
        print("\nAnalyzing your responses...\n")
        analysis = analyze_car_issue(responses)

        print("AI Diagnostic Analysis:")
        print("=" * 50)
        print(analysis)
        print("=" * 50)

        return responses, analysis
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()
