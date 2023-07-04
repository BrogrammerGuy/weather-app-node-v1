const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=88ff403b48722b42a5633ff232e3fc0c&query=' + latitude + ',' + longitude
    
    request( {url, json: true}, (error, {body} = {}) => {
        if (error) {
            console.log(error)
            callback('Cannot connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            //- Object Destructuring
            const {weather_descriptions:{0:weather_description}, temperature, feelslike, humidity} = body.current

            callback(undefined, weather_description + '. It\'s currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out. The humidity is ' + humidity + '%.')
        }
    })
}

module.exports = forecast