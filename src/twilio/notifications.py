# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


def send_message(message, receiver):
    # Find your Account SID and Auth Token at twilio.com/console
    # and set the environment variables. See http://twil.io/secure
    account_sid = 'AC29109774231a8fc34bf323bd9d41e8a8'
    auth_token = '1c5b987ac2aaf7f3bc6d77ce3cc982fc'
    client = Client(account_sid, auth_token)

    message = client.messages \
        .create(
            body=message,
            from_='+14246228834',
            to=receiver
        )


send_message("Do it for firefox bitch", "+447922125079")
