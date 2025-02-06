

function logger() {
    return (req, res, next) => {
        console.log(`*** URL:${req.url} *** METHOD:${req.method}`);
        next();

    }

}

module.exports = logger;