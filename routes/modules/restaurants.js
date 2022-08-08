const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


// routes setting 瀏覽全部餐廳
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//search setting
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const restaurants = restaurantsData.filter(restaurant => {
        return (restaurant.name.toLowerCase()
          .includes(keyword.toLowerCase())
          || restaurant.category.toLowerCase()
            .includes(keyword.toLowerCase()))
      })
      if (restaurants.length === 0) {
        res.render('noresult', { keyword: keyword });
      } else { res.render('index', { restaurants, keyword: keyword }) }
    })
})

//create restaurants
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

//restaurant detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

//restaurant edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name;
      restaurant.name_en = name_en;
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//restaurant delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router