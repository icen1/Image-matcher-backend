import pprint
import requests
import json
import csv


def getImage(id):
    # Request an Image
    image = requests.get(
        f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{id}").json()
    return image


# Pretty print
pp = pprint.PrettyPrinter(indent=4)

# Search for "gogh" in department 11 (European Paintings)
images = requests.get(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11").json()['objectIDs']


# Make output.csv file and open it
output = open('output.csv', 'w', newline='')
csvWrite = csv.writer(output)

# Look for primary image in the first 500 images in images
objectsInJson = json.loads(json.dumps(images))
for i in range(len(objectsInJson)):
    image = getImage(objectsInJson[i])
    # If there is an object add all the paramters we need to a csv file
    if (len(image) > 1) and image['primaryImageSmall'] != "":
        csvWrite.writerow([image['title'], image['objectDate'],
                          image['primaryImageSmall'], image['artistDisplayName']])


# Close the file
output.close()
