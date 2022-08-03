const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()

module.exports = async (req, res, next) => {
	try {
		const authToken = req.headers.authorization?.split(' ')[1]
		let payload
		if (!authToken || !(payload = jwt.verify(authToken, process.env.JWT_SECRET)))
			return res.status(403).send({ err: 'Not authorized' })
		req.user = await User.findById(payload.userId).select([
			'id',
			'name',
			'email',
			'role',
		])
		if (!req.user) return res.status(404).send({ err: 'User not found' })
		next()
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ err : 'Internal Server Error' })
	}
}
