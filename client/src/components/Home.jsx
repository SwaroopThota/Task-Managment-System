import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import Task from './Task'
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<>
			<Stack spacing={5} width='100%'>
				<Typography variant='h3' textAlign={'center'}>
					Home
				</Typography>
				<Stack
					spacing={3}
					sx={{
						padding: '2rem',
						border: '1px solid black',
						borderRadius: '45px',
					}}
				>
					<Typography variant='h4'>My Tasks</Typography>
					<Task />
					<Task />
					<Task />
				</Stack>
				<Stack
					spacing={3}
					sx={{
						padding: '2rem',
						border: '1px solid black',
						borderRadius: '45px',
					}}
				>
				<Stack direction='row' justifyContent={'space-evenly'}>
					<Typography variant='h4'>Assigned Tasks</Typography>
					
					<Button variant='outlined'><Link to={'/create-task'}>Assign task</Link></Button>
				</Stack>
					<Task />
				</Stack>
			</Stack>
		</>
	)
}

export default Home
