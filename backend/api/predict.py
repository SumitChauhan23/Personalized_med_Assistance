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

    try:
        # 1st Assistant Interaction
        thread = client.beta.threads.create(messages=[{"role": "user", "content": user_input}])
        run = client.beta.threads.runs.create(thread_id=thread.id, assistant_id=ASSISTANT_ID)

        # Wait for the run to complete with a timeout
        timeout = 30  # seconds
        start_time = time.time()

        while run.status != "completed":
            if time.time() - start_time > timeout:
                raise TimeoutError("OpenAI assistant response timed out.")
            run = client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
            print(f"Waiting for first assistant... Status: {run.status}")
            time.sleep(1)

        # Extract response
        message_response = client.beta.threads.messages.list(thread_id=thread.id)
        response_content = message_response.data[0].content[0].text.value
        print("First assistant response:", response_content)

        # Predict disease
        predicted_disease = predictDisease(response_content)
        print("Predicted disease:", predicted_disease)

        # 2nd Assistant Interaction
        thread2 = client.beta.threads.create(messages=[{"role": "user", "content": predicted_disease}])
        run2 = client.beta.threads.runs.create(thread_id=thread2.id, assistant_id=ASSISTANT_ID2)

        # Wait with timeout again
        start_time = time.time()
        while run2.status != "completed":
            if time.time() - start_time > timeout:
                raise TimeoutError("Second assistant response timed out.")
            run2 = client.beta.threads.runs.retrieve(thread_id=thread2.id, run_id=run2.id)
            print(f"Waiting for second assistant... Status: {run2.status}")
            time.sleep(1)

        message_response2 = client.beta.threads.messages.list(thread_id=thread2.id)
        response_content2 = message_response2.data[0].content[0].text.value
        print("Second assistant response:", response_content2)

        return jsonify({"response": response_content2})
    
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"response": "An error occurred. Please try again."}), 500

    
if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)
