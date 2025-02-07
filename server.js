const DEFAULTPORT = require('./utils/constant.js');
const hbs = require('hbs');
const logger = require('./utils/logger.js');
const path = require('path');
const express = require('express');
const app = express();

// logger middleware
app.use(logger())

// set absolute path to the view folder
app.set('views', path.join(__dirname, 'views'));

// set hbs as rendering engine
app.set('view engine', 'hbs');

// set absolute path to the static files
app.use(express.static(path.join(__dirname, 'static_files')));

// routes here
const indexRouter = require('./routes/indexRoute.js')
const BeerRouter = require('./routes/beerRoutes.js');
app.use('/', indexRouter);
app.use('/', BeerRouter);


// error-handling middleware
app.use((req, res, next) => {
    res.render('404-errorPage.hbs')
})


const PORT = 5000 || DEFAULTPORT;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));