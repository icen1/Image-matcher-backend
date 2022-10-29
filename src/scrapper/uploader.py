import csv
from PIL import Image
import requests
from io import BytesIO
import imagehash
import psycopg2

from config import url, cert

conn = psycopg2.connect(url, sslrootcert=cert)
cur = conn.cursor()
"""
from urllib.parse import urlparse

result = urlparse(url)
connection = psycopg2.connect(
    database=result.path[1:],
    user=result.username,
    password=result.password,
    host=result.hostname,
    port=result.port
)
"""


def hash_img(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    return imagehash.phash(img)


def insert(*args):
    cur.execute("INSERT INTO images (created, url, title, author, hash) VALUES (%s, %s, %s, %s, %s)", args)


i = 0


def run():
    global i
    with open('output.csv') as file:
        for line in csv.reader(file):
            h = hash_img(line[2])
            insert(line[1], line[2], line[0], line[3], str(h))
            print(i)
            i += 1

"""
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
"""

insert('a', 'b', 'c', 'd', 'e')

conn.commit()
cur.close()
conn.close()
