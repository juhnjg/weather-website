const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianVobmpnIiwiYSI6ImNrdmJrN3R1ajBncWwyb3Fnb2pkeWowOTYifQ.b5i4i8nnp3ADgPKwyNC1Zg'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (Array.isArray(response.body.features) && response.body.features.length === 0) {
            callback('Unable to find location. Try another search @geocode', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                logitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode