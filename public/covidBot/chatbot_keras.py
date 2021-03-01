# -*- coding: utf-8 -*-
"""
Created on Wed Dec 16 23:22:24 2020

@author: nakag
"""

import json

# things we need for NLP
import string
import nltk
from nltk.stem import SnowballStemmer
stemmer = SnowballStemmer('spanish')
from nltk.corpus import stopwords
from nltk.tokenize.toktok import ToktokTokenizer
toktoktoken = ToktokTokenizer()

# things we need for Tensorflow
import numpy as np
import tensorflow as tf
import random


import keras
from numpy import loadtxt
from keras.models import Sequential
from keras.layers import Dense

# things we need for the conversation 
import emoji
from termcolor import colored
from gingerit.gingerit import GingerIt
import numpy as np
#%%
#Import training data
with open('intents.json', 'rb') as f:
    intents = json.load(f)
    
#Autonomous community telephone numbers
with open('comunidades_autonomas.json', 'rb') as o:
    ca = json.load(o)
    
#%%
def tokenize (sentence):
    return toktoktoken.tokenize(sentence)

def stem(word):

    return stemmer.stem(word.lower())

def bag_of_words (tokenized_sentence, vocabulary):
    

    #Stem the sentence
    sentence = [stem(w) for w in tokenized_sentence]
    
    #All-zeros array for bag
    bag = np.zeros(len(vocabulary))
    

    for idx, w in enumerate(vocabulary):
        if w in sentence:
            bag[idx] = 1
    
    return bag

def bag_nostem(tokenized_sentence, vocabulary):
    
    tokenized_sentence = [w.lower() for w in tokenized_sentence]
    
    bag = np.zeros(len(vocabulary))
    
    for idx, w in enumerate(vocabulary):
        if w in tokenized_sentence:
            bag[idx] = 1
    
    return bag

#%%
#Create an empty list with pattern words 
vocabulary = []
#Create an empty list with tag words 
tags = []
#Create an empty list with tag and pattern words 
xy = []
#Create an empty list with tag and tag index 
tag_idx = []
#Create list with responses
responses = []

for intent in intents['intents']:
    tag = intent['tag']
    tags.append(tag)
    response_list = []
    
    for pattern in intent['patterns']:
        #Tokenize each word in the sentence
        words = tokenize(pattern)        
        #Add words to the pattern_words list
        vocabulary.extend(words)
        #Add words and tag tuple to our xy list
        xy.append((words,tag))
    
    for response in intent['responses']:
        response_list.append(response)
    responses.append(response_list)
        
#Add tag and tag tuple to our tag_idx list
for idx in range(len(tags)):
    tag_idx.append((idx, tags[idx]))

#%%
#Remove punctuation characters and transform to lower case
vocabulary = [stem(w.lower()) for w in vocabulary if w not in string.punctuation]

#Remove duplicated values
vocabulary = sorted(set(vocabulary))
tags = sorted(set(tags))

#%%
#Create an empty list with pattern words 
vCA = []
#Create an empty list with tag words 
tagsCA = []
#Create an empty list with tag and pattern words 
xyCA = []
#Create an empty list with tag and tag index 
tag_idxCA = []
#Create empty list with telephones
tlf = []

for cam in ca['CA']:
    tag = cam['coma']
    tagsCA.append(tag)
    
    for pattern in cam['patterns']:
        #Tokenize each word in the sentence
        words = tokenize(pattern)        
        #Add words to the pattern_words list
        vCA.extend(words)
        #Add words and tag tuple to our xy list
        xyCA.append((words,tag))
    
    for telephone in cam['telephone']:
        tlf.append((cam["coma"], telephone))
        
        
#Add tag and tag tuple to our tag_idx list
for idx in range(len(tagsCA)):
    tag_idxCA.append((idx, tagsCA[idx]))
    
#Remove punctuation characters and transform to lower case
vCA = [w.lower() for w in vCA if w not in string.punctuation]

#Remove duplicated values
vCA = sorted(set(vCA))
tagsCA = sorted(set(tagsCA))
#%%
#Create empty lists for our training data 
X_trainCA = []
y_trainCA = []

"""
For each pattern sentence, we will create a bag of words and append it
to the X_train dataset, then we will append the output label for that 
sentence to the y_train dataset. This way, we will create a our training
dataset. 

The X_train dataset will consist of a matrix containing the bag vector of
each pattern sentence of 0's and 1's. On the other hand, the y_train will
consist of the output labels in the form of indexes, so the indexes will 
range from 0 to the length of the list "tags". 

"""
for (pattern_sentence, tag) in xyCA:
    bag = bag_nostem(pattern_sentence, vCA)
    X_trainCA.append(bag)
    
    label = tagsCA.index(tag)
    y_trainCA.append(label)
    
X_trainCA = np.array(X_trainCA)
y_trainCA = np.array(y_trainCA)

y_arrayCA = np.zeros((X_trainCA.shape[0], len(tagsCA)))

count = 0

for idx in range(len(y_trainCA)):
    label = y_trainCA[idx]
    y_arrayCA[count][label] = 1
    count += 1
    
#%%
# Neural network
modelCA = Sequential()
modelCA.add(Dense(16, input_dim = X_trainCA.shape[1], activation='relu'))
modelCA.add(Dense(12, activation='relu'))
modelCA.add(Dense(y_arrayCA.shape[1], activation='softmax'))

#%%
modelCA.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
modelCA.fit(X_trainCA, y_arrayCA, epochs=200, batch_size=10)

#%%
#Create empty lists for our training data 
X_train = []
y_train = []

"""
For each pattern sentence, we will create a bag of words and append it
to the X_train dataset, then we will append the output label for that 
sentence to the y_train dataset. This way, we will create a our training
dataset. 

The X_train dataset will consist of a matrix containing the bag vector of
each pattern sentence of 0's and 1's. On the other hand, the y_train will
consist of the output labels in the form of indexes, so the indexes will 
range from 0 to the length of the list "tags". 

"""
for (pattern_sentence, tag) in xy:
    bag = bag_of_words(pattern_sentence, vocabulary)
    X_train.append(bag)
    
    label = tags.index(tag)
    y_train.append(label)
    
X_train = np.array(X_train)
y_train = np.array(y_train)

y_array = np.zeros((X_train.shape[0], len(tags)))

count = 0

for idx in range(len(y_train)):
    label = y_train[idx]
    y_array[count][label] = 1
    count += 1
    
#%%
from sklearn.model_selection import train_test_split

X_TRAIN, X_TEST, Y_TRAIN, Y_TEST = train_test_split(X_train,y_array,test_size = 0.1, random_state = 6)


X_TRAIN.shape[1]

Y_TRAIN.shape

# Neural network
model = Sequential()
model.add(Dense(16, input_dim = X_train.shape[1], activation='relu'))
model.add(Dense(12, activation='relu'))
model.add(Dense(y_array.shape[1], activation='softmax'))

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

model.fit(X_train, y_array, epochs=200, batch_size=10)

#%%
print(colored("Hola, soy Cova.  ", attrs = ["bold"]) , "\U0001F916",
      colored("\n\nMe han creado para intentar ayudarte con todas tus posibles dudas relacionadas con el Covid-19. Estoy encantado/a de hablar contigo y ayudarte en todo lo que pueda.",attrs = ["bold"]),
      colored("\n\n¡Puedo darte información sobre muchos temas!", attrs = ["bold"]), 
      "\n\n\U00002705", colored("¿Qué es el coronavirus?", attrs = ["bold"]), "\U0001F9A0",
      "\n\U00002705", colored("Teléfonos Covid ", attrs = ["bold"]),"\U0001F4DE",
      "\n\U00002705", colored("Síntomas", attrs = ["bold"]),"\U0001F927\U0001F321",      
      "\n\U00002705", colored("Contactos con positivos", attrs = ["bold"]),"\U0001F91D\U000026A0",
      "\n\U00002705", colored("Cuarentena", attrs = ["bold"]),"\U0001F3E0", 
      "\n\U00002705", colored("Consejos para protegerte del coronavirus", attrs = ["bold"]),"\U0001F44F\U0001F9FC\U00002728",
      colored("\n\n¡Vamos! Pregúntame algo", attrs =["bold"]), "\U0001F601"

     )

conversation = True

bot_name = "Cova"
while conversation:
    
    print("")
    #Ask for a question from the user
    response = input('Tú: ')
    
    #Response without grammar parser
    response_p = tokenize(response)
    
    # #Grammar correction of the question
    # parser = GingerIt()
    # result = parser.parse(response)
    # response = result['result']
    
    #Tokenization and bag of words
    x_sentence = tokenize(response_p)
    bag_x = bag_of_words(x_sentence, vocabulary)
    bag_test = np.zeros((1, X_train.shape[1]))
    bag_test[0] = bag_x
    
    #Prediction of the response
    predictions = model.predict_classes(bag_test)
    probability = model.predict_proba(bag_test)
    

    
    if probability[0][predictions[0]] >= 0.85:
    
        label_response = tags[predictions[0]]

        for idx, element in tag_idx:
            
            if element == label_response:
                print('')
                output = colored( random.choice(responses[idx]).encode('latin1').decode('unicode-escape'),  attrs = ["bold"])
                print("Cova: ", output)
                
                if label_response == 'CovidTelephone':
                    
                    #Bag of words for Autonomous Community
                    bag_ca = bag_nostem(response_p, vCA)
                    bag_testca = np.zeros((1, X_trainCA.shape[1]))
                    bag_testca[0] = bag_ca
                    
                    #Predictions for Autonomous Community
                    prediction_ca = modelCA.predict_classes(bag_testca)
                    probability_ca = modelCA.predict_proba(bag_testca)
                    
                    if probability_ca[0][prediction_ca][0] >= 0.25:
                        community = tagsCA[prediction_ca[0]]
                        
                        for com, phone in tlf: 
                            if com == community:
                                phone_number = phone
                            
                        response_tlf = "Cova: El número de teléfono de {} es: {}".format(community, phone_number)
                        print(colored(response_tlf, attrs = ["bold"]))
                    
                    else:
                        print(colored("Te puedo ayudar con los números de teléfono para el Covid-19. ¿Cuál es tu Comunidad Autónoma?\n", attrs=["bold"]))
                        
                        input_ca = input('Tú: ')

                        #Tokenize input and bag of words
                        input_ca = tokenize(input_ca)
                        bag_caq = bag_nostem(input_ca, vCA)
                        bag_testcaq = np.zeros((1, X_trainCA.shape[1]))
                        bag_testcaq[0] = bag_caq


                        #Predictions for Autonomous Community
                        prediction_caq = modelCA.predict_classes(bag_testcaq)
                        probability_caq = modelCA.predict_proba(bag_testcaq)
                        if probability_caq[0][prediction_caq][0] >= 0.25:
                            community = tagsCA[prediction_caq[0]]

                            for com, phone in tlf: 
                                if com == community:
                                    phone_number = phone

                            response_tlf = "\n\nCova: El número de teléfono de {} es: {}".format(community, phone_number)
                            print(colored(response_tlf, attrs = ["bold"]))
                        
                        else:
                            print(colored("\n\nCova: Lo siento, no entendí tu respuesta", attrs = ["bold"]))
    else:
        print(colored("\n\nCova: Lo siento, no entendí tu pregunta", attrs = ["bold"]))
        