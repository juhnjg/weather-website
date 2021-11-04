const request = require('request')

const forecast = (latitude ,longitude,  callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=585ba13b2ce1e2a5d3596b50c3346bcb&query=' + latitude+ ',' + longitude + '&units=m'

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined)

        } else if (response.body.error) {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + '% chance of rain.')
        }

    })

}

module.exports = forecast

