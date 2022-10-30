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
    with open('archive/artwork_data.csv') as file:
        for line in csv.reader(file):
            h = hash_img(line[3])
            insert(line[0], line[1], line[3], line[2], line[4], str(h))
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