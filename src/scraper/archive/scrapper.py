import pprint
import requests
import json
import csv


def getImage(id):
    # Request an Image
    image = requests.get(
        f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{id}").json()
    return image


# Pretty print for debugging
pp = pprint.PrettyPrinter(indent=4)

# Get all images in department 11 (European Paintings)
images = requests.get(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11").json()['objectIDs']

# Get all images in department 21 (Modern Art)
images += requests.get(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=21").json()['objectIDs']

# Make output.csv file and open it
output = open('output.csv', 'w', newline='')
csvWrite = csv.writer(output)

# Get all images properties we need and write them to output.csv
objectsInJson = json.loads(json.dumps(images))
for i in range(len(objectsInJson)):
    image = getImage(objectsInJson[i])
    print(image)
    # If there is an object add all the paramters we need to a csv file
    if (len(image) > 1) and image['primaryImageSmall'] != "" and image['classification'] == "Paintings":
        csvWrite.writerow([image['title'], image['objectDate'], image['primaryImage'],
                          image['primaryImageSmall'], image['artistDisplayName']])


# Close the file
output.close()
