// First, install express js npm 'npm i express', then rqr it
const express = require('express')

// path module is used to configure the static files path
const path = require('path')

// hbs module is required to use partials
const hbs = require('hbs')


// Request NPM (although it's deprecated, need to find some other npm)
const request = require('request')

//Require our util modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Express is merely a function, we need to expose it to use the server
const app = express()

// Usually port 3000 is used as an arbitrary port, but for some reason Java keeps locking itself in it, even after killing it, that's why I use port 3001 instead.
const port = process.env.PORT || 3001;

// Define paths for express config, also hbs config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Using handlebars: 
//      1)setup view engine
//      2)setup views path
//      3)setup static directory to serve
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirPath))

// Using hbs:
hbs.registerPartials(partialsPath)

//--- NOTE: When using 'app.use' with 'express.static', if there's a handler HTML found in the directory, then it gets to be run.

// Landing page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Afandy'
    })
})

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Afandy'
    })
})

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Afandy',
        message: 'Some message that should appear only in help page'
    })
})

// Help 404 handler
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errMsg: 'Help article not found',
        name: 'Afandy'
    })
})

// Weather page
app.get('/weather', (req, res) => {
    // If no address is provided in the query, we return an error.
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        // If there's an error from geocode (i.e. Service is down or location doesn't exist), we return an error.
        if (error) {
            return res.send({ error })
        }

        // We then call forecase to get the actual forecast data using the location parameters returned from geocode
        forecast(latitude, longitude, (error, forecastData) => {
            // If there's an error (e.g. service is down), we return it.
            if (error) {
                return res.send({ error })
            }

            // Otherwise, we send back the JSON with all the output... Note: we used shorthand syntax in here as well.
            res.send({
                address,
                location,
                forecast: forecastData
            })
        })
    })
    
})

// Dummy products thing
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide search term.'
        })
    }

    res.send({
        products: []
    })
})

// 404 handler
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Page not found',
        name: 'Afandy'
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on ${port}!`)
})