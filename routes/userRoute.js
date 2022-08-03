const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const authenticateUser = require('../middleware/authenticateUser')
require('dotenv').config()

// GET: current user details
router.get('/', authenticateUser, (req, res) => {
	try {
		res.json({ user: req.user })
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ err: 'Internal Server Error' })
	}
})

// GET: all user details
router.get('/all', authenticateUser, async (req, res) => {
	try {
		let users = await User.find({
			$and: [{ role: 'user' }, { email: { $ne: req.user.email } }],
		}).select(['id', 'name'])
		res.json({ users })
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ err: 'Internal Server Error' })
	}
})

// POST: adding new user
router.post('/addUser', async (req, res) => {
	try {
		const { name, email, password, role } = req.body
		const user = new User({ name, email, password, role })
		await user.save()
		res.send('user added successfully')
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ err: 'Internal Server Error' })
	}
})

// POST: Login user
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		let user = await User.findOne({ email })
		if (!user || user.password !== password)
			return res.json({ err: 'username or password is incorrect.' })
		const payload = { userId: user.id }
		const authToken = jwt.sign(payload, process.env.JWT_SECRET)
		res.send({ authToken })
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ err: 'Internal Server Error' })
	}
})

module.exports = router
