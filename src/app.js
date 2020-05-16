const path = require('path');
const express = require('express');
const hbs = require('hbs');
const foreCast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Bryan Lumbantobing'
    });
});

app.get('/about', (req,res) => {
    res.render('about',
    {
        title : 'About me',
        name : 'Bryan Lumbantobing'
    });
})

app.get('/help', (req,res) => {
    res.render('help', {
       title : 'Help & Support',
       message : "What's your problem now?",
       name : 'Bryan Lumbantobing'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error : "you must provide an address"
        })
    } else {
        foreCast(`${req.query.address}`, (error,{location, temperature, precip} = {}) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast : temperature,
                address : req.query.address,
                precip
            });
        });

    }
});

app.get('/help/*',(req, res) => {
    res.render('404notfound', {
        message : "Help Article Not Found",
        code : "404",
        name : "Bryan Lumbantobing"
    })
});

app.get('/product', (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error : 'you must provide a search term'
        });
    } 

    console.log(req.query.search);
    res.send({
        products : []
    });
})

app.get('*',(req, res) => {
    res.render('404notfound', {
        message : "Page Not Found",
        code : "404",
        name : "Bryan Lumbantobing"
    })
});





app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});