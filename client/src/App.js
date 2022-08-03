import Container from '@mui/material/Container'
import { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { userContext } from './components/context/UserProvider'
import CreateTask from './components/CreateTask'
import Home from './components/Home'
import Login from './components/Login'

function App() {
	const { isLoading, isLoggedIn, getUser, setIsLoading } = useContext(userContext)
	useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (!authToken) {
			setIsLoading(false)
			return
		}
		getUser(authToken)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<Container
				maxwidth='sm'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '80vh',
				}}
			>
				{isLoading ? (
					'Loading...Please Wait...'
				) : (
					<Routes>
						<Route
							path='/'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route path='/login' element={<Login />} />
						<Route
							path='/create-task'
							element={
								<ProtectedRoute isLoggedIn={isLoggedIn}>
									<CreateTask />
								</ProtectedRoute>
							}
						/>
					</Routes>
				)}
			</Container>
		</>
	)
}

const ProtectedRoute = ({ isLoggedIn, children }) => {
	if (!isLoggedIn) return <Navigate to='/login' replace />
	return children
}

export default App
