const express = require('express')
const app = express()
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/', (req, res) => {
  res.render('home', { msg: 'Nya has the fattest pussy' });
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
