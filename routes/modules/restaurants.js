const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


// routes setting 瀏覽全部餐廳
router.get('/', (req, res) => {
  Restaurant.find()
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


//create restaurants
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})

//restaurant detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})

//restaurant edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})

//restaurant delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { error: err.message }
      )
    })
})

module.exports = router