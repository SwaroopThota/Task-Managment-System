import React, { useState } from 'react'
import { MenuItem, TextField, Typography, Button, Stack } from '@mui/material'
import { useContext } from 'react'
import { userContext } from './context/UserProvider'
import { Link } from 'react-router-dom'

const CreateTask = () => {
	const { users, addTask } = useContext(userContext)
	const [task, setTask] = useState({
		taskDescription: '',
		assignedTo: '',
	})
	const handleChange = (e) => {
		setTask({ ...task, [e.target.name]: e.target.value })
	}
	const handleClick = async () => {
		try {
			addTask(task)
			setTask({
				taskDescription: '',
				assignedTo: '',
			})
			alert('Task assigned successfull...')
		} catch (err) {
			alert(err)
		}
	}
	return (
		<>
			<Stack
				spacing={5}
				sx={{
					padding: '2rem',
					border: '1px solid black',
					borderRadius: '45px',
					width: '500px',
				}}
			>
				<Typography variant='h3'>Create New Task</Typography>
				<TextField
					required
					label='Task Description'
					multiline
					maxRows={10}
					variant='standard'
					value={task.taskDescription}
					onChange={handleChange}
					name='taskDescription'
				/>
				<TextField
					select
					variant='standard'
					name='assignedTo'
					label='Assign to'
					value={task.assignedTo}
					onChange={handleChange}
					fullWidth
					required
				>
					{users.map(({ _id, name }, index) => (
						<MenuItem value={_id} key={index}>
							{name}
						</MenuItem>
					))}
				</TextField>
				<Button variant='outlined' onClick={handleClick}>
					Create
				</Button>
				<Button variant='outlined'>
					<Link to='/' variant='outlined'>Go Back</Link>
				</Button>
			</Stack>
		</>
	)
}

export default CreateTask
