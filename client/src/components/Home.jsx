import React, { useContext, useEffect } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import Task from './Task'
import { Link } from 'react-router-dom'
import { userContext } from './context/UserProvider'

const Home = () => {
	const { user, getMyTasks, getAssignedTasks, myTasks, assignedTasks, logout, isAdmin } =
		useContext(userContext)
	useEffect(() => {
		getMyTasks()
		getAssignedTasks()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Stack spacing={2} width='90%' textAlign={'center'}>
				<Typography variant='h3'>Home</Typography>
				<Stack direction='row' justifyContent='space-evenly'>
					<Typography variant='h6'>Hello, {user.name}</Typography>
					<Button variant='outlined' color='error' onClick={logout}>
						Logout
					</Button>
				</Stack>
				{!isAdmin && (
					<Stack
						spacing={2}
						sx={{
							padding: '2rem',
						}}
					>
						<Typography variant='h4'>My Tasks</Typography>
						<hr />
						{myTasks.length > 0 ? (
							myTasks.map((task) => (
								<Task
									task={task}
									isAssignedTask={false}
									key={task._id}
								/>
							))
						) : (
							<em>No Tasks for today...</em>
						)}
					</Stack>
				)}

				<Stack
					spacing={3}
					sx={{
						padding: '2rem',
					}}
				>
					<Stack direction='row' justifyContent={'space-evenly'}>
						<Typography variant='h4'>
							{isAdmin ? 'All Tasks' : 'Assigned Tasks'}
						</Typography>
						<Button variant='outlined'>
							<Link to={'/create-task'}>Assign task</Link>
						</Button>
					</Stack>
					<hr />
					{assignedTasks.length > 0 ? (
						assignedTasks.map((task) => (
							<Task
								task={task}
								isAssignedTask={true}
								key={task._id}
							/>
						))
					) : (
						<em>No Tasks for today...</em>
					)}
				</Stack>
			</Stack>
		</>
	)
}

export default Home
