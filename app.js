const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-term2');

const Charity = mongoose.model('Charity', {
    org: String
});

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'))

// MOCK ARRAY OF PROJECTS
let charities = [
    { org: "SF Childrens Hospital"},
    { org: "Orange Juice for All"}
]

// INDEX
app.get('/', (req, res) => {
  Charity.find()
    .then(charities => {
        res.render('charities-index', {charities: charities})
    })
    .catch(err => {
        console.log(err)
    })
})

// NEW
app.get('/charities/new', (req, res) => {
  res.render('charities-new', {});
})

// CREATE
app.post('/charities', (req, res) => {
    Charity.create(req.body)
        .then((charity) => {
            console.log(charity)
            res.redirect(`/charities/${charity.id}`)
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// SHOW
app.get('/charities/:id', (req, res) => {
    Charity.findById(req.params.id)
        .then((charity) => {
            res.render('charities-show', {charity: charity})
        })
        .catch((err) => {
            console.log(err.message)
    })
})

// EDIT
app.get('/charities/:id/edit', (req, res) => {
    Charity.findById(req.params.id, function(err, charity) {
        res.render('charities-edit', {charity: charity})
    })
})

// UPDATE
app.put('/charities/:id', (req, res) => {
    Charity.findByIdAndUpdate(req.params.id, req.body)
        .then(charity => {
            res.redirect(`/charities/${charity._id}`)
        })
        .catch(err => {
            console.log(err.message)
        })
})

// DELETE
app.delete('/charities/:id', function(req, res) {
    console.log('Charity deleted')
    Charity.findByIdAndRemove(req.params.id).then((charity) => {
        res.redirect('/')
    }).catch((err => {
        console.log(err.message)
    }))
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
