# image-matcher-backend (aka Pictura)
A Hack the Midlands project / web app designed to encourage more engagement with art by finding similar pieces exclusive of the painter or other technical details.
Art is matched using perceptual hashes, a concept that can be used to find similarities between images.

## Technologies
 - Typescript
 - React (Frontend)
 - Express (Backend)
 - Postgresql (DB)
 - CockroachDB (DB Hosting)
 - Microsoft Azure (Backend Hosting)
 - Netlify (Frontend Hosting)
 - Twilio (Feed Notifications) (?)

## Screenshots
(TODO)

## API Routes

| Method | Path                             | Body Params | Response           |
|--------|----------------------------------|-------------|--------------------|
| GET    | `/random/:weighted?`             |             | Image \| 404       |
| GET    | `/list/:max?/:page?`             |             | Image[]            |
| GET    | `/group/:weighted?/:max?/:page?` |             | Image[] \| 404     |
| GET    | `/image/:id`                     |             | Image \| 404       |
| GET    | `/similar/:id/:max?/:page?/`     |             | Image[] \| 404     |
| POST   | `/like`                          | `id`        | Total likes \| 404 |

## See also
[mgsium/image-matcher-frontend](https://github.com/mgsium/image-matcher-frontend)

[pHash.org](https://www.phash.org/)
[perceptual hashing in more depth](https://www.hackerfactor.com/blog/?/archives/432-Looks-Like-It.html)

## Credits
The backend was written by [@maartin0](https://github.com/maartin0), [@icen1](https://github.com/icen1) and [@AyoDev](https://github.com/AyoDev)
The frontend was written by [@mgsium](https://github.com/mgsium/)
