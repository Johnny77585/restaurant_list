const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//瀏覽全部餐廳，並排序
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})

//search setting
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  const sort = req.query.sort
  Restaurant.find({ userId })
    .lean()
    .sort(JSON.parse(sort))
    .then(restaurantsData => {
      const restaurants = restaurantsData.filter(restaurant => {
        return (restaurant.name.toLowerCase()
          .includes(keyword.trim().toLowerCase())
          || restaurant.category.toLowerCase()
            .includes(keyword.trim().toLowerCase()))
      })
      if (restaurants.length === 0) {
        res.render('noresult', { keyword: keyword, sort });
      } else { res.render('index', { restaurants, keyword: keyword, sort }) }
    })
})

module.exports = router
