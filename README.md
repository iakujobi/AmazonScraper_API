# Setup Process

Note: There are 2 branches. Master (w/out comments) & withComments (has comments). The master branch is hosted on Heroku

1. npm init -y: Creates package.json
2. npm install express request-promise nodemon: Install the express, request-promise and nodemon packages
   - Add dev command to script: This allows us to run the application while developing
3. create index.js file: This is the api
4. require express and request-promise: Express creates the backend application and request-promise allows us to make API requests
5. const app = express(): Initialize the application with express as a function
6. create the port (the one used is 6001)
   NOTE: List of routes blocked - https://stackoverflow.com/questions/4313403/why-do-browsers-block-some-ports/22622633#22622633
7. express.json(): Allow app to parse JSON input
8. app.get(): This is just a message to let us know that the server is running
9. app.listen(): Make the server listen on a specific port
   - At this point, this is the end bare bone EXPRESS application
   - To run application (on terminal), use npm run dev
   - Stop server: ctrl + c
   - Server crashed because request-promise needs a dependency. Need to install request
   - npm install request: Installs request. Server run smoothly!
   - npm run dev: Starts the server to start listening on port 6001.
   - check browser for result: http://localhost:6001/
10. Sign up on scraperapi.com: It's a proxy API for web scraping
    - Create an apiKey with it
11. Create baseUrl: we can now make our own routes from our API to fetch specific products
12. Create route to fetch product details - '/products/:productID'
    - First get productID from parameters
    - Get a response from scraperapi
    - Send response back from the server
    - Provide the error
    - To run route on server, use http://localhost:6001/products/B08N5LFLC3
    - B08N5LFLC3 is the productID and can get it from amazon url for a particular product.
    - Example: a specific macbook air laptop url is https://www.amazon.com/Apple-MacBook-13-inch-512GB-Storage/dp/B08N5LFLC3/ref=sr_1_3?crid=1X2QLT72QF31O&keywords=macbook+air&qid=1644807769&sprefix=macbook+air%2Caps%2C64&sr=8-3
    - NOTE: npm install dotenv - allows us to use the .env library. Create a .env file and hide scraperapi key
13. Create GET route for Product Reviews
    - added /reviews to GET route
    - changed the response from scraperapi from /dp/ to /product-reviews/
    - check result on http://localhost:6001/products/B08N5LFLC3/reviews
14. Create GET route for Product Offers
    - added /offers to GET route
    - changed the response from scraperapi from /dp/ to /gp/offer-listing/
    - check result on http://localhost:6001/products/B08N5LFLC3/offers
15. Create GET route for Search Results
    - When you go Amazon and search for Macbook Air, we get a query like this: https://www.amazon.com/s?k=macbook+air&crid=6CA6GCWXVHH2&sprefix=macbook+air%2Caps%2C64&ref=nb_sb_noss_1
    - Use this to URL to construct the searchQuery for the scraperapi response
    - use searchQuery and change /dp/ to /s?k=${searchQuery}
    - To access result, use http://localhost:6001/search/macbookair
16. Do we want to share our API or do we want to everyone to get their own scraper api key?
    - create generateScraperUrl. Allows user to use their own scraper api key
    - enables user to enter their own API key - const { api_key } = req.query
    - for user to use their api key, use /products/:productID?api_key=
    - add generateScraperUrl(apiKey) in place of baseUrl to each response from scraperapi

## READY TO DEPLOY CODE TO HEROKU!!!

## DEPLOY TO RAPIDAPI MARKETPLACE!!!
