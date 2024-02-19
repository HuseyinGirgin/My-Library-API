*** How to Run It? *** 

//there are three different env. 
- dev.env: it is development env.
- test.env: it is test env. for unit test.
- prod.env: it is prod env that containers are used.
 
// fetch mongo image if you do not have it
- docker pull mongo

// create and run new container for mongo db by mongo image(only dev and test env. Do not run below command for prod.env.)
- docker run --name mongo-db-1 -d -p 27017:27017 mongo

//You can execute mongo shell to check collections and documents (optional)
- docker exec -it <container name> mongosh

// to run dev
- npm run dev

// to run test.env 
- npm test 

// to run prod.env use following instructions.

// open terminal and change directory to current project directory
- cd C:\Users\<Your computer user>\Desktop\CASE_STUDY\My-Library-API

// run docker command in current project directory
- docker compose up

// check containers that are currently running
- docker ps

// ensure two container running
CONTAINER ID   IMAGE                COMMAND                  CREATED          STATUS          PORTS                        NAMES

e08fdcec3319   my-library-api-web   "docker-entrypoint.s…"   20 seconds ago   Up 18 seconds   0.0.0.0:3000->3000/tcp     my-library-api-web-1

45d35e44dc20   mongo                "docker-entrypoint.s…"   20 seconds ago   Up 19 seconds   0.0.0.0:27017->27017/tcp   my-library-api-mongodb-1

// TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// you can send request with localhost:3000

// use TOKEN with Bearer every request

// to stop and remove containers 
- docker compose down

**** Endpoints ****


-POST: localhost:3000/author/create-new-author

Body: {
    "name":"Huseyin Girgin",
    "country":"Turkey",
    "birthdate":"01-03-1997"
}

-POST: localhost:3000/book/create-new-book

Body: {
    "title":"title-2",
    "author":<authorId>, // you can take id by first endpoint response
    "price":10,
    "language":"eng",
    "numberofPages":7
}

-GET: localhost:3000/book/<bookId>

-GET: localhost:3000/book/

-PATCH: localhost:3000/book/<bookId>

Body: {
    "title":"title-3",
    "price":11
}

-DELETE: localhost:3000/book/<bookId>

-DELETE: localhost:3000/book/
