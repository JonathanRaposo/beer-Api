const DEFAULTPORT = require('./utils/constant.js');
const hbs = require('hbs');
const logger = require('./utils/logger.js');
const path = require('path');
const express = require('express');
const app = express();

const ApiService = require('./api/ApiService.js');
const apiService = new ApiService('https://ih-beers-api2.herokuapp.com/beers');

// logger middleware
app.use(logger())

// set absolute path to the view folder
app.set('views', path.join(__dirname, 'views'));

// set hbs as rendering engine
app.set('view engine', 'hbs');

// set absolute path to the static files
app.use(express.static(path.join(__dirname, 'static_files')));

// set partials
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))

app.get('/', (req, res) => {
    res.render('homePage.hbs');
})

app.get('/beers', async (req, res) => {

    try {
        let beers = await apiService.getBeers();
        beers = beers.slice(0, beers.length - 1)
        res.render('beerListPage.hbs', { beers });
    } catch (err) {
        console.log(err);
    }


})

app.get('/beers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const beer = await apiService.getBeer(id);
        res.render('beerPage.hbs', beer);
    } catch (err) {
        console.log(err);
    }

})
app.get('/beers/random', async (req, res) => {
    try {
        const beer = await apiService.getBeer(id);
        res.render('beerPage.hbs', beer);
    } catch (err) {
        console.log(err);
    }
})




















app.use((req, res, next) => {
    res.render('404-errorPage.hbs')
})


const PORT = 5000 || DEFAULTPORT;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));