const express = require('express');
const router = express.Router();



const ApiService = require('../api/ApiService.js');
const apiService = new ApiService('https://ih-beers-api2.herokuapp.com/beers');


router.get('/beers/search', async (req, res) => {
    const { q: query } = req.query;
    try {
        const beers = await apiService.searchQuery(query)
        if (beers.length > 0) {
            res.render('beerListPage.hbs', { beers });
            return;
        }
        res.render('noResultsPage.hbs', req.query)
    } catch (err) {
        console.log(err)
    }
})

router.get('/beers', async (req, res) => {

    try {
        let beers = await apiService.getBeers();
        beers = beers.slice(0, beers.length - 1)
        res.render('beerListPage.hbs', { beers });
    } catch (err) {
        console.log(err);
        
    }


})

router.get('/beers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const beer = await apiService.getBeer(id);
        res.render('beerPage.hbs', beer);
    } catch (err) {
        console.log(err);

    }

})
router.get('/beers/random', async (req, res) => {
    try {
        const beer = await apiService.getRandomBeer();
        res.render('beerPage.hbs', beer);
    } catch (err) {
        console.log(err);
  
    }
});

module.exports = router;
