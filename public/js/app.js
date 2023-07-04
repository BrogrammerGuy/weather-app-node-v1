console.log('This should be loaded in console on homepage.')

const weatherForm = document.querySelector(".weather-form")
const searchInput = document.querySelector(".weather-location")
var msgOne = document.querySelector("#message-1")
var msgTwo = document.querySelector("#message-2")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchInput.value
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    // Fetch API is a JS Client-Side API that runs async. This takes 1 parameter (URL) from which we fetch from.
    // We can use 'then' to handle the output. Which is similar to passing a 'callback function' in nodejs.
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            msgOne.textContent = data.error;
        } else {
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        }
    })
    })
})