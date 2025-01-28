
# Libraries for the model
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import StandardScaler

# We are using Flask as our backend API
from flask import Flask, jsonify, request

# We need to process the recieve data
from utilities import process_data

app = Flask(__name__)

# Temporal variable to store the user score
prediction = 0

# Main page, for this project serves no purpose
@app.route("/")
def hello_world():
    return 'Hello, World!'

# End point where de data arrives
@app.route("/credit/calculate", methods=["POST"])
def user_calculate_risk():

    # Extract the data
    loan_amnt = request.json["loan_amnt"]
    term = request.json["term"]
    int_rate = request.json["int_rate"]
    installment = request.json["installment"]
    sub_grade = request.json["sub_grade"]
    home_ownership = request.json["home_ownership"]
    annual_inc = request.json["annual_inc"]
    purpose = request.json["purpose"]
    dti = request.json["dti"]
    delinq_2yrs = request.json["delinq_2yrs"]
    inq_last_6mths = request.json["inq_last_6mths"]
    open_acc = request.json["open_acc"]
    pub_rec = request.json["pub_rec"]
    revol_bal = request.json["revol_bal"]
    total_acc = request.json["total_acc"]
    last_pymnt_amnt = request.json["last_pymnt_amnt"]
    policy_code = request.json["policy_code"]
    application_type = request.json["application_type"]
    acc_now_delinq = request.json["acc_now_delinq"]
    month = request.json["month"]
    year = request.json["year"]

    # Map it to a dictionary
    data = {
        "loan_amnt": loan_amnt,
        "term": term,
        "int_rate": int_rate,
        "installment": installment,
        "sub_grade": sub_grade,
        "home_ownership": home_ownership,
        "annual_inc": annual_inc,
        "purpose": purpose,
        "dti": dti,
        "delinq_2yrs": delinq_2yrs,
        "inq_last_6mths": inq_last_6mths,
        "open_acc": open_acc,
        "pub_rec": pub_rec,
        "revol_bal": revol_bal,
        "total_acc": total_acc,
        "last_pymnt_amnt": last_pymnt_amnt,
        "policy_code": policy_code,
        "application_type": application_type,
        "acc_now_delinq": acc_now_delinq,
        "month": month,
        "year": year
    }

    # Process de data for model prediction (check utilities.py)
    user_data = process_data(data)

    # Data to adjust the Scaler
    fitter_data = pd.read_csv("datos_balanceados.csv")
    
    # Scale the data
    scaler = StandardScaler()
    scaler.fit(fitter_data.drop("target", axis = 1))
    data_transformed = scaler.transform(user_data)

    # Call the prediction function and store the value
    # Bear in mind that the model returns the chances the burrower
    # pays the credit, so to get the risk we inverted it
    # by substracting 1
    user_score = float(1 - model.predict(data_transformed)[0][0])

    global prediction
    prediction = user_score * 100

    print(prediction)
    
    return "Done"

@app.route("/credit/get")
def return_score():
    print(prediction)
    return jsonify({"user_score": prediction})


if __name__ == '__main__':

    # Load the model
    model = tf.keras.models.load_model("modelo_final.keras")

    app.run(debug=True)