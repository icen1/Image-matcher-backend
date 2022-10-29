import csv
from PIL import Image
import requests
from io import BytesIO
import imagehash
import psycopg2

from config import url, cert

conn = psycopg2.connect(url, sslrootcert=cert)
cur = conn.cursor()

def hash_img(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    return imagehash.phash(img)


def insert(*args):
    cur.execute("INSERT INTO images (title, created, url, url_large, author, hash) VALUES (%s, %s, %s, %s, %s, %s)", args)


i = 0


def run():
    global i
    with open('output.csv') as file:
        for line in csv.reader(file):
            h = hash_img(line[2])
            insert(*line, str(h))
            print(i)
            i += 1


try:
    run()
except KeyboardInterrupt:
    pass

print("Stopping...")
if i > 1000:
    print("Saving...")
    conn.commit()
    cur.close()
    conn.close()
    print("Saved")