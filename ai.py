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
    
    # Loop through each question and get user input
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