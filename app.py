from sklearn.feature_extraction.text import CountVectorizer
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

@app.route('/predict', methods=['POST', 'GET'])
def my_result():

    vocab = joblib.load(open("vocabulary.sav", "rb"))
    loaded_model = joblib.load('./finalized_model.sav')
    data = request.get_json()
    msg = data.get('input', '')
    print(msg)
    message = []
    message.append(msg)
    
    cv_2 = CountVectorizer(vocabulary= vocab)
    message = cv_2.transform(message)
    message = message.toarray()

    x =  loaded_model.predict(message)[0]
    return jsonify({
       'prediction': str(x)
    })

if __name__ =='__main__' :
    app.run(debug=True)
    