from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import pickle
import numpy as np
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Ensure you set your OpenAI API key as an environment variable
API_KEY = os.getenv("OPENAI_API_KEY")
 # Use environment variable for security
client = OpenAI(api_key=API_KEY)

ASSISTANT_ID = os.getenv("ASSISTANT_ID")
ASSISTANT_ID2 = os.getenv("ASSISTANT_ID2")


# Load your pkl model and data dictionary
with open('final_rf_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('data_dict.pkl', 'rb') as dict_file:
    data_dict = pickle.load(dict_file)

def predictDisease(symptoms):
    symptoms = symptoms.split(",")
    
    # Creating input data for the model
    input_data = [0] * len(data_dict["symptom_index"])
    for symptom in symptoms:
        index = data_dict["symptom_index"].get(symptom.strip(), None)
        if index is not None:
            input_data[index] = 1

    # Reshaping the input data
    input_data = np.array(input_data).reshape(1, -1)

    # Generating prediction using the Random Forest model
    rf_prediction = data_dict["predictions_classes"][model.predict(input_data)[0]]
  
    return rf_prediction

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('description', '')

    # Create a thread with the user message.
    thread = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": user_input,
            }
        ]
    )
    # print(f"user_input - {user_input}")
    # Submit the thread to the assistant (as a new run).
    run = client.beta.threads.runs.create(thread_id=thread.id, assistant_id=ASSISTANT_ID)
    # print(f"run - {run}")
    # print(f"thread - {thread}")
     
      # Wait for run to complete.
    while run.status != "completed":
        run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
        time.sleep(1)

    # Get the latest message from the thread.
    message_response = client.beta.threads.messages.list(thread_id=thread.id)
    messages = message_response.data

    latest_message = messages[0]
    response_content = latest_message.content[0].text.value
    print(response_content)
    predicted_disease = predictDisease(response_content)
    # Pass the symptoms to the predictDisease function
    
    thread2 = client.beta.threads.create(
        messages=[
            {
                "role": "user",
                "content": predicted_disease,
            }
        ]
    )


    run2 = client.beta.threads.runs.create(thread_id=thread2.id, assistant_id=ASSISTANT_ID2) 
    
    while run2.status != "completed":
        run2 = client.beta.threads.runs.retrieve(thread_id=thread2.id, run_id=run2.id)
        time.sleep(1)
    message_response2 = client.beta.threads.messages.list(thread_id=thread2.id)
    messages2 = message_response2.data

    latest_message2 = messages2[0]
    response_content2 = latest_message2.content[0].text.value


    # second_assistant_response = thread2['choices'][0]['message']['content']
    print(f"/n/n Response from 1st Assistant - {response_content}")
    print(f"/n/n response from the disease prediction model - {predicted_disease}")
    print(f"/n/n Response from the 2nd Assistant - {response_content2}")
    if response_content == "Invalidinp":
        return jsonify({"response": "Invalid input"})
    else:
        return jsonify({"response": response_content2})
    
if __name__ == '__main__':
    app.run(debug=True)