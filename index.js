// Import libraries
require('dotenv').config() // allows us to use the .env library
const express = require('express') // use express to create a backend application
const request = require('request-promise') // use request-promise to make api requests

// Initialize the application
const app = express() // call express as a function
// Create port
const PORT = process.env.PORT || 6001

// API key from scraperapi.com
const apiKey = process.env.SCRAPER_API_KEY

// Create base URL
const baseUrl = `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true` // we can now make our own routes from our API to fetch specific products and add extra parameters (use &)

app.use(express.json()) // allows the application to parse JSON input

// Every EXPRESS application needs at least one route
// '/' is the initial route route
// () is the callback function and inside it, we have the request and response and then return something
app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API!') // this is just a message to let us know that the server is running
})

// Create route to fetch product details
// GET Product Details
// :productID - the colon means that the product ID is going to be dynamic
app.get('/products/:productID', async (req, res) => {
    // First get productID from parameters
    const { productID } = req.params // productID is going to be populated inside request.paramaters

    try {
        // Get a response from scraperapi
        // Inside request, provide the first url and add extra parameters (use &)
        // dp: this is product details
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productID}`) // this is going to give us information for a specific product

        // Send response back from the server
        // res.json(response) // response in text format
        res.json(JSON.parse(response)) // transforms result to JSON
    } catch (err) {
        res.json(err) // provide the error
    }
})

// Last thing needed to start the server
// Make the server listen on a specific port
// ${PORT}: template strings which helps us to specify on which port we are currently running the application
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))