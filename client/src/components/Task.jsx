import React from 'react'
import { MenuItem, Stack, TextField } from '@mui/material'
import { useContext } from 'react'
import { userContext } from './context/UserProvider'

const Task = ({ task, isAssignedTask }) => {
	const {  updateTaskStaus, isAdmin } = useContext(userContext)
	// console.log(task.assignedTo._id, user._id)
	let statusOptions = [
		{ status: 'created', display: 'Open', disabled: false },
		{ status: 'in progress', display: 'In-progress', disabled: false },
		{ status: 'completed', display: 'Completed', disabled: false },
		{ status: 'closed', display: 'Closed', disabled: false },
	]
	if (!isAdmin && isAssignedTask) {
		statusOptions[0].disabled = true
		statusOptions[1].disabled = true
		statusOptions[2].disabled = true
	}
	if (!isAssignedTask) {
		statusOptions[0].disabled = true
		statusOptions[3].disabled = true
	}

	const handleChange = async (e) => {
		try {
			const status = e.target.value
			await updateTaskStaus(task._id, status, isAssignedTask)
		} catch (err) {
			alert(err)
		}
	}

	return (
		<>
			<Stack
				direction='row'
				border='1px solid black'
				padding='1rem'
				borderRadius='30px'
			>
				<Stack width='70%' spacing={2}>
					<span>
						<strong>Description: </strong>: {task.taskDescription}
					</span>
					<span>
						<strong>Created By: </strong>
						{task.createdBy.name}
					</span>
					<span>
						<strong>Assigned To: </strong>
						{task.assignedTo.name}
					</span>
				</Stack>
				<TextField
					disabled={!isAdmin && !task.isActive}
					select
					label='Status'
					value={task.currentStatus}
					onChange={handleChange}
				>
					{statusOptions.map(({ status, disabled, display }) => (
						<MenuItem
							value={status}
							key={status}
							disabled={disabled}
						>
							{display}
						</MenuItem>
					))}
				</TextField>
			</Stack>
		</>
	)
}

export default Task
