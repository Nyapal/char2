const express = require('express')
const app = express()
const exphbs = require('express-handlebars');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity-term2');

const Charity = mongoose.model('Charity', {
    org: String
});

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/', (req, res) => {
  Charity.find()
    .then(charities => {
        res.render('charities-index', {charities: charities})
    })
    .catch(err => {
        console.log(err)
    })
})

// app.js

// OUR MOCK ARRAY OF PROJECTS
let charities = [
  { org: "SF Childrens Hospital"},
  { org: "Orange Juice for All"}
]

// INDEX
app.get('/charities', (req, res) => {
  res.render('charities-index', { charities: charities });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
