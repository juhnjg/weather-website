const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'JK'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'JK'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help page. Please feel free to ask anything',
        name: 'JK'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {

            return res.send({
                error

            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        })
    })



})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })


})



app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404page',
        name: 'jk',
        errorMessage: 'Help article not found'
    }
    )
})


app.get('*', (req, res) => {
    res.render('404page', {
        title: '404page',
        name: 'jk',
        errorMessage: 'Page not found'
    }
    )
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port'+ port)
})