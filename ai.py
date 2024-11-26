import pandas as pd
#from transformers import pipeline
from typing import Dict
from langchain import HuggingFaceHub
from datetime import datetime

HUGGINGFACEHUB_API_TOKEN = "Please_Insert_Token" #Insert your Hugging Face API token here

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
        "Have there been any recent changes in the car's performance, such as difficulty starting, reduced power, or trouble stopping?",
        "Are there any warning lights or indicators on the dashboard? If so, which ones?",
        "Have you had any recent repairs, maintenance, or part replacements?",
        "Have you noticed any leaks under the car or unusual fluid levels?",
        "Does the problem happen during specific actions, such as braking, accelerating, or turning?",
        "Have you checked basic components like the fuel level, tire pressure, or oil level recently?"
    ]

    # Loop through each question and get user inpu
    for question in questions:
        print("\n" + question)
        response = input("Your response: ")
        responses[question] = response

    print("\nThank you for your responses. Here's a summary of your answers:\n")
    for question, answer in responses.items():
        print(f"{question}\n-> {answer}\n")

    return responses

# Run the screening
if __name__ == "__main__":
    car_issue_screening()

def analyze_car_issue(responses: Dict) -> str:
    """
    Analyze the user's responses to diagnose the car issue.
    """

    #Combine all responses into a single contex
    context = "\n".join([f"Q: {q}\nA: {a}" for q, a in responses.items()])

    # Initialize the AI model
    llm = HuggingFaceHub(
        repo_id="mistralai/Mistral-7B-Instruct-v0.1",
        huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
        model_kwargs={"temperature": 0.7, "max_length": 512}
    )

    # Create the analysis promp
    prompt_template = """
    Based on the following car diagnostic information, provide a detailed analysis:

    {context}

    Please provide:
    1. Most likely issues based on the symptoms
    2. Recommended immediate actions
    3. Potential severity level (Low/Medium/High)
    4. Whether professional mechanic consultation is needed

    Analysis:
    """

    # Generate AI analysis
    full_prompt = prompt_template.format(context=context)
    response = llm(full_prompt)[0]['generated_text']

    return response

def main():
    # Get user responses
    responses = car_issue_screening()

    print("\nAnalyzing your responses...\n")

    # Get AI analysis
    analysis = analyze_car_issue(responses)

    print("AI Diagnostic Analysis:")
    print("=" * 50)
    print(analysis)
    print("=" * 50)

    return responses, analysis

if __name__ == "__main__":
    main()