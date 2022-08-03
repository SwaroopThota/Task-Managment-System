const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
	status: {
		type: String,
		enum: ['created', 'in progress', 'completed', 'closed'],
		default: 'created',
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	updatedBy: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
		ref: 'User',
	},
})

const taskSchema = new mongoose.Schema({
	taskDescription: {
		type: String,
		required: true,
	},
	createdBy: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
		required: true,
	},
	assignedTo: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	currentStatus: {
		type: String,
		default: 'created'
	},
	statusLogs: {
		type: [statusSchema],
	},
	isActive: {
		type: Boolean,
		default: true
	}
})

module.exports = new mongoose.model('Task', taskSchema)
