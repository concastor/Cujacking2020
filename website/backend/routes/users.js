const router = require('express').Router()
const User = require('../models/user.model')

// url path /users/
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

// url path /users/add
router.route('/add').post((req, res) => {
  const username = req.body.username
  const isAdmin = Boolean(req.body.isAdmin)

  const newUser = new User({username, isAdmin})

  newUser.save()
    .then(() => res.status(201).json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

// get user specific details
router.route('/:username').get((req, res) => {
  User.findById(req.params.username)
  // User.find({username: req.params.username})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json('Error: ' + err))
})

// Update as post
router.route('/:username').post((req, res) => {
  User.findById(req.params.username)
  // User.find({username: req.params.username})
    .then(user => {
      user.username = req.body.username
      user.isAdmin = req.body.isAdmin

      user.save()
        .then(() => res.status(202).json('User Updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})

// delete user
router.route('/:username').delete((req, res) => {
  User.findById(req.params.username)
  // User.find({username: req.params.username})
    .then(user => {
      user.delete()
        .then(() => res.status(202).json('User Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
})

module.exports = router
