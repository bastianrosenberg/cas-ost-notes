# Notes App

This is a project for the CAS Frontend Engineer OST 2023/2024

# Technologies

- node.js: [nodejs](https://nodejs.org/en/about)
- routing middleware: [express](https://expressjs.com/en/guide/using-middleware.html)
- backend: [Mongoose](https://mongoosejs.com/docs/index.html)

## Additional packages

- nodemon (Restart on file change)
- body-parser (Request body parsing)
- socket.io (websockets)

## Get started

- run command `npm install` in the root directory
- install a local mongodb on your pc
- create a `.env` file in the root directory with an entry pointing to your mongodb collection
  e.g. `DATABASE_URL="mongodb://localhost/notes"`
- `npm run dev` (this will start your app with nodemon)
