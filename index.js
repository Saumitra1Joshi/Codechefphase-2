require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');



// app.get("/findrestaurants", (req, res) => {
//     curl.setHeaders([
//         `user-key: ${process.env.ZOMATO_API_KEY}`
//     ])
//     .get(`https://developers.zomato.com/api/v2.1/search?q=${cityname}&count=20&sort=rating`)
//     .then(({statusCode, body, headers}) => {
//         console.log(statusCode, body, headers)
//     })
//     .catch((e) => {
//         console.log(e);
//     });
// })

// document.querySelector("typeinput").addEventListener("change", copyinput);

// function copyinput() {
//     document.querySelector("copiedinput").value = "fdsfsd";
// }

function copyinput() {
    const cityname = data.value;
    document.querySelector(".copiedinput").value = data.value;
}

function searchCities(data) {
    const url = `https://developers.zomato.com/api/v2.1/cities?q=${cityname}&count=20`;
    console.log(cityname);
    let options = {
        "Accept": "application/json",
        "user-key": "d3f631e720af9d4d47aec8e087d00d83"
    }
    https.request(url, options, (res) => {
        res.on("data", function(data) {
            console.log(data);
            
        })
    })
}

var headers = {
    "Accept": "application/json",
    "user-key": "d3f631e720af9d4d47aec8e087d00d83"
}
app.get("/", (req, res) => {
    res.render("home");
})

app.get("/findrestaurants", (req, res) => {
    const cityname = req.body.cityname;
    let api = `https://developers.zomato.com/api/v2.1/search?q=${cityname}&count=20&sort=rating`;
    fetch(api, {method: 'GET', headers: headers})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.render("index", {data: data});
        })
        .catch(err => {
            console.log(err);
        })
})


// fetch(api)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             res.render("result",{country: data.sys.country, city: data.name, temp: data.main.temp, humidity: data.main.humidity});
//         })
//         .catch(err => {
//             console.log(err);
//         })
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));