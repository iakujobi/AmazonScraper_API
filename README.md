Setup Process

1. npm init -y: Creates package.json
2. npm install express request-promise nodemon: Install the express, request-promise and nodemon packages
   - Add dev command to script: This allows us to run the application while developing
3. create index.js file: This is the api
4. require express and request-promise: Express creates the backend application and request-promise allows us to make API requests
5. const app = express(): Initialize the application with express as a function
6. create the port (the one used is 5000)
7. express.json(): Allow app to parse JSON input
8. app.get(): This is just a message to let us know that the server is running
9. app.listen(): Make the server listen on a specific port
   - At this point, this is the end bare bone EXPRESS application
   - To run application (on terminal), use npm run dev
   - Stop server: ctrl + c
   - Server crashed because request-promise needs a dependency. Need to install request
   - npm install request: Installs request. Server run smoothly!
