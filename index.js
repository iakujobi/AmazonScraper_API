// Import libraries
require('dotenv').config() // allows us to use the .env library
const express = require('express') // use express to create a backend application
const request = require('request-promise') // use request-promise to make api requests

// Initialize the application
const app = express() // call express as a function
// Create port
const PORT = process.env.PORT || 6001

// API key from scraperapi.com
// const apiKey = process.env.SCRAPER_API_KEY // reference scraperapi key in .env file

// Create base URL
// const baseUrl = `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true` // we can now make our own routes from our API to fetch specific products and add extra parameters (use &). Also change URL because it is no longer going to be static
const generateScraperUrl = (apiKey) =>  `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true` // This is going to be function that is going to accept an APIkey and based on it, it is going to return a string similar to the one we've had so far. No longer our API key, now we are passing it inside anytime we call the function
// Instead of baseUrl, we call generateScraperUrl inside each function call

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
// Where is this apiKey coming from? Add query parameters (?api_key=) to each request so that in RapidAPI marketplace, users will be able to specify their API key 
// To do this add - ?api_key= to the requests
app.get('/products/:productID', async (req, res) => {
    // First get productID from parameters
    const { productID } = req.params // productID is going to be populated inside request.paramaters
    const { api_key } = req.query // enables user to enter their own API key

    try {
        // Get a response from scraperapi
        // Inside request, provide the first url and add extra parameters (use &)
        // dp: this is product details
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productID}`) // this is going to give us information for a specific product

        // Send response back from the server
        // res.json(response) // response in text format
        res.json(JSON.parse(response)) // transforms result to JSON
    } catch (err) {
        res.json(err) // provide the error
    }
})

// Create route to fetch product reviews
// GET Product Reviews
// :productID - the colon means that the product ID is going to be dynamic
app.get('/products/:productID/reviews', async (req, res) => {
    // First get productID from parameters
    const { productID } = req.params // productID is going to be populated inside request.paramaters
    const { api_key } = req.query // enables user to enter their own API key

    try {
        // Get a response from scraperapi
        // Inside request, provide the first url and add extra parameters (use &)
        // dp: this is product details
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productID}`) // this is going to give us information for a specific product

        // Send response back from the server
        // res.json(response) // response in text format
        res.json(JSON.parse(response)) // transforms result to JSON
    } catch (err) {
        res.json(err) // provide the error
    }
})

// Create route to fetch product offers
// GET Product Offers
// :productID - the colon means that the product ID is going to be dynamic
app.get('/products/:productID/offers', async (req, res) => {
    // First get productID from parameters
    const { productID } = req.params // productID is going to be populated inside request.paramaters
    const { api_key } = req.query // enables user to enter their own API key

    try {
        // Get a response from scraperapi
        // Inside request, provide the first url and add extra parameters (use &)
        // dp: this is product details
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productID}`) // this is going to give us information for a specific product

        // Send response back from the server
        // res.json(response) // response in text format
        res.json(JSON.parse(response)) // transforms result to JSON
    } catch (err) {
        res.json(err) // provide the error
    }
})

// Create route to fetch Search Results
// GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
    // First get searchQuery from parameters
    const { searchQuery } = req.params // productID is going to be populated inside request.paramaters
    const { api_key } = req.query // enables user to enter their own API key

    try {
        // Get a response from scraperapi
        // Inside request, provide the first url and add extra parameters (use &)
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`) // this is going to give us information for a specific product

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