const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
//search setting
app.get('/search', (req, res) => {

  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return (restaurant.name.toLowerCase()
      .includes(keyword.toLowerCase())
      || restaurant.category.toLowerCase()
        .includes(keyword.toLowerCase()))

  })
  console.log(restaurants.length)
  if (restaurants.length === 0) {
    res.render('noresult', { keyword: keyword });
  } else { res.render('index', { restaurants: restaurants, keyword: keyword }) }
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
