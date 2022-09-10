const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


// routes setting 瀏覽全部餐廳
// router.get('/', (req, res) => {
//   const userId = req.user._id
//   Restaurant.find()
//     .lean()
//     .then(restaurants => res.render('index', { restaurants }))
//     .catch(err => {
//       console.log(err)
//       res.render(
//         'errorPage',
//         { error: err.message }
//       )
//     })
// })


//create restaurants
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id

  Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
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
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
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
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
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
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOneAndUpdate({ _id, userId }, req.body)

    .then(() => res.redirect(`/restaurants/${_id}`))
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
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
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