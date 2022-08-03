const authenticateUser = require('../middleware/authenticateUser')
const Task = require('../models/Task')
const router = require('express').Router()

router.use(authenticateUser)

router.post('/add-task', async (req, res) => {
	try {
		const { taskDescription, assignedTo } = req.body
		const task = new Task({
			taskDescription,
			assignedTo,
			createdBy: req.user.id,
			statusLogs: [
				{
					updatedBy: req.user.id,
				},
			],
		})
		await task.save()
		res.json(task)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ err: 'Internal Server Error' })
	}
})

router.get('/my-tasks', async (req, res) => {
	try {
		const tasks = await Task.find({ assignedTo: req.user.id })
			.populate('createdBy', 'name')
			.populate('assignedTo', 'name')
		res.json(tasks)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ err: 'Internal Server Error' })
	}
})
router.get('/assigned-tasks', async (req, res) => {
	try {
		const options =
			req.user.role === 'user' ? { createdBy: req.user.id } : {}
		const tasks = await Task.find(options)
			.populate('assignedTo', 'name')
			.populate('createdBy', 'name')
		res.json(tasks)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ err: 'Internal Server Error' })
	}
})
router.put('/update/:id', async (req, res) => {
	try {
		const user = req.user
		const { status } = req.body
		const task = await Task.findById(req.params.id)
		if (!task.isActive)
			return res.status(403).json({ err: 'Not authorized' })
		if (
			user.role === 'user' &&
			user.id === task.createdBy.toString() &&
			status !== 'closed'
		)
			return res.status(403).json({ err: 'Not authorized' })
		if (
			user.role === 'user' &&
			user.id === task.assignedTo.toString() &&
			status !== 'in progress' &&
			status !== 'completed'
		)
			return res.status(403).json({ err: 'Not authorized' })
		if (task.currentStatus === 'closed') task.isActive = true
		task.currentStatus = status
		task.statusLogs.push({
			status,
			updatedBy: user.id,
		})
		if (status === 'closed') task.isActive = false
		await task.save()
		res.json(task)
	} catch (err) {
		console.log(err.message)
		res.status(500).json({ err: 'Internal Server Error' })
	}
})

module.exports = router
