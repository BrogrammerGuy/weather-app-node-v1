const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYWxhZmFuZHkiLCJhIjoiY2xnd2dkNWlsMTVhdTNtbzVpY2gxd2Y3dCJ9.sZNlgvTbfxuoNE-o02QK_w&limit=1'

    request( {url, json: true}, (error, {body:{features}}) => {
        if (error) {
            callback('Unable to connect to Locations Service.', undefined)
        } else if (features.length === 0) {
            callback('Unable to find address. Try another search', undefined)
        } else {
            //- Object Destructuring
            const {center:{0:longitude, 1:latitude}, place_name:location} = features[0]
            //- longitude, latitude, location are the local variable names, while we can destructure the features[0] but writing the property we want to read from as such
            //- 'center:{0:x, 1:y}
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode