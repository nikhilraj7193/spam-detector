# Importing the libraries

import nltk
import numpy as np
import pandas as pd
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer,WordNetLemmatizer
from nltk.tokenize import word_tokenize
import sklearn.metrics as m
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
import joblib


import warnings
warnings.filterwarnings('ignore')


# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')


# Importing dataset and Preprocessing the data

dataset = pd.read_csv('spam.csv', encoding='latin-1')

text = dataset.iloc[:,[1]]['v2']

label = dataset.iloc[:,[0]]['v1']


from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
label=le.fit_transform(label)

import re # regular expression
stem = PorterStemmer()

sentences=[]
for sen in text:
  senti=re.sub('[^A-Za-z]',' ',sen)
  senti=senti.lower()
  words=word_tokenize(senti)
  word=[stem.stem(i) for i in words if i not in stopwords.words('english')]
  senti=' '.join(word)
  sentences.append(senti)


from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(max_features=5000)

features = cv.fit_transform(sentences)
features=features.toarray()

vocab = cv.vocabulary_

a_file = open("vocabulary.sav", "wb")
joblib.dump(vocab, a_file)
a_file.close()
# -----> Test train split
feature_train,feature_test,label_train,label_test=train_test_split(features,label,test_size=0.2,random_state=7)


# # Applying svc Classifier
svc_model=SVC(kernel='linear')
svc_model.fit(feature_train,label_train)

label_pred=svc_model.predict(feature_test)


filename = 'finalized_model.sav'
joblib.dump(svc_model, filename)

