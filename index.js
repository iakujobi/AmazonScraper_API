// Import libraries
const express = require('express') // use express to create a backend application
const request = require('request-promise') // use request-promise to make api requests

// Initialize the application
const app = express() // call express as a function
// Create port
const PORT = process.env.PORT || 5000

app.use(express.json()) // allows the application to parse JSON input

// Every EXPRESS application needs at least one route
// '/' is the initial route route
// () is the callback function and inside it, we have the request and response and then return something
app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API!') // this is just a message to let us know that the server is running
})

// Last thing needed to start the server
// Make the server listen on a specific port
// ${PORT}: template strings which helps us to specify on which port we are currently running the application
app.listen(PORT, () => console.log('Server running on port ${PORT}'))