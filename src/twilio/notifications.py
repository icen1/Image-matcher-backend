# Download the helper library from https://www.twilio.com/docs/python/install
import os
import requests
import json
from twilio.rest import Client


def send_message(message, receiver):
    # Find your Account SID and Auth Token at twilio.com/console
    # and set the environment variables. See http://twil.io/secure
    account_sid = '***REMOVED***'
    auth_token = '***REMOVED***'
    client = Client(account_sid, auth_token)

    message = client.messages \
        .create(
            body=message,
            from_='+14246228834',
            to=receiver
        )

def send_image(user, prev=None):
    if prev == None:
        data = requests.get('http://20.0.0.86:3000/random')
        img = data.json()['url']
        img
    else:
        data = requests.get('http://20.0.0.86:3000/similar/'+prev+'/1')
        img = data.json()[0]['url']
    
    print(img)
    #send_message(img, user)

#send_message("Do it for firefox bitch", "+447922125079")
send_image("+447922125079",'f2eac675-57ce-4555-87d9-5be885c03415')#+447897484604")