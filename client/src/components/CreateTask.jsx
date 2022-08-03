import React, { useState } from 'react'
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	Button,
	Stack,
} from '@mui/material'
import { useContext } from 'react'
import { userContext } from './context/UserProvider'

const CreateTask = () => {
	const { users } = useContext(userContext)
	const [task, setTask] = useState({
		taskDescription: '',
		assignedTo: '',
	})
	const handleChange = (e) => {
		setTask({ ...task, [e.target.name]: e.target.value })
		console.log(task);
	}
	const handleClick = () => {
		console.log(task)
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
					label='Task Description'
					multiline
					maxRows={10}
					variant='standard'
					value={task.taskDescription}
					onChange={handleChange}
					name='taskDescription'
				/>
				<FormControl fullWidth>
					<InputLabel>Assign to</InputLabel>
					<Select
						value={task.assignedTo}
						label='Age'
						onChange={handleChange}
						name='assignedTo'
						variant='standard'
					>
					<MenuItem value='' key={''} selected>None</MenuItem>
						{users.map((user) => (
							<MenuItem value={user.id} key={user.name} selected>
								{user.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button variant='outlined' onClick={handleClick}>
					Create
				</Button>
			</Stack>
		</>
	)
}

export default CreateTask
