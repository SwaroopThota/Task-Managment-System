import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { userContext } from './context/UserProvider'

const Login = () => {
	const { loginUser, isLoggedIn } = useContext(userContext)
	const [user, setUser] = useState({
		email: '',
		password: '',
	})
	if (isLoggedIn) return <Navigate to={'/'} replace />

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}
	const handleLogin = async () => {
		try {
			await loginUser(user)
			return <Navigate to={'/'} replace />
		} catch (err) {
			alert(err)
		}
	}

	return (
		<Stack
			spacing={5}
			sx={{
				padding: '2rem',
				border: '1px solid black',
				borderRadius: '45px',
				width: '500px',
			}}
		>
			<Typography variant='h3'>Login Page</Typography>
			<TextField
				fullWidth
				label='Email'
				variant='standard'
				name='email'
				value={user.email}
				onChange={handleChange}
			/>
			<TextField
				label='Password'
				type='password'
				variant='standard'
				name='password'
				value={user.password}
				onChange={handleChange}
			/>
			<Button variant='outlined' onClick={handleLogin}>
				Login
			</Button>
		</Stack>
	)
}

export default Login
