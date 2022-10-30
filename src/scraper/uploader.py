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
    with open('artwork_data.csv', encoding="mbcs") as file:
        a = iter(csv.reader(file))
        next(a)
        for line in a:
            try:
                small = line[18].replace("www.tate", "media.tate")
                large = small.replace("_8.jpg", "_10.jpg")
                h = hash_img(small)
                insert(line[5], line[9], small, large, line[2], str(h))
            except:
                continue
            if i > 5000:
                break
            i += 1
            print(i)


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