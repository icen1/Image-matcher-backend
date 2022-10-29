# Download the helper library from https://www.twilio.com/docs/python/install
import os
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


send_message("Do it for firefox bitch", "+447922125079")
