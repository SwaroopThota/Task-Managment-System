import React, { createContext, useState } from 'react'
import { Navigate } from 'react-router-dom'

const userContext = createContext()
const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [myTasks, setMyTasks] = useState([])
	const [assignedTasks, setAssignedTasks] = useState([])
	let [user, setUser] = useState({
		_id: '',
		name: '',
		email: '',
		role: '',
	})
	let [users, setUsers] = useState([])

	const loginUser = async (user) => {
		try {
			setIsLoading(true)
			let res = await fetch('http://localhost:5000/api/user/login', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			})
			res = await res.json()
			const authToken = res.authToken
			localStorage.setItem('authToken', authToken)
			await getUser(authToken)
		} catch (err) {
			console.log(err)
		}
		setIsLoading(false)
	}

	const getUser = async (authToken) => {
		try {
			setIsLoading(true)
			let res = await fetch('http://localhost:5000/api/user/', {
				headers: {
					authorization: `Bearer ${authToken}`,
				},
			})
			res = await res.json()
			user = res.user
			setIsLoggedIn(true)
			setUser(user)
			await getAllUsers()
			setIsAdmin(res.user.role === 'admin')
		} catch (err) {
			alert(err)
		}
		setIsLoading(false)
	}

	const getAllUsers = async () => {
		try {
			let res = await fetch('http://localhost:5000/api/user/all', {
				headers: {
					authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
			})
			res = await res.json()
			users = res.users
			setUsers(users)
		} catch (err) {
			alert(err)
		}
	}

	const addTask = async (task) => {
		await fetch('http://localhost:5000/api/task/add-task', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
			body: JSON.stringify(task),
		})
	}

	const getMyTasks = async () => {
		try {
			let res = await fetch('http://localhost:5000/api/task/my-tasks', {
				method: 'GET',
				mode: 'cors',
				headers: {
					authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
			})
			res = await res.json()
			setMyTasks(res)
		} catch (err) {
			console.log(err)
			// alert(err)
		}
	}
	const getAssignedTasks = async () => {
		try {
			let res = await fetch(
				'http://localhost:5000/api/task/assigned-tasks',
				{
					method: 'GET',
					mode: 'cors',
					headers: {
						authorization: `Bearer ${localStorage.getItem(
							'authToken'
						)}`,
					},
				}
			)
			res = await res.json()
			setAssignedTasks(res)
		} catch (err) {
			alert(err)
		}
	}

	const updateTaskStaus = async (id, status, isAssignedTask) => {
		try {
			await fetch(`http://localhost:5000/api/task/update/${id}`, {
				method: 'PUT',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${localStorage.getItem(
						'authToken'
					)}`,
				},
				body: JSON.stringify({ status }),
			})
			if (isAssignedTask) await getAssignedTasks()
			else await getMyTasks()
		} catch (err) {
			alert(err)
		}
	}

	const logout = () => {
		localStorage.removeItem('authToken')
		setUser({
			_id: '',
			name: '',
			email: '',
			role: '',
		})
		setAssignedTasks([])
		setIsAdmin(false)
		setIsLoggedIn(false)
		setUsers([])
		setMyTasks([])
		return <Navigate to='/login' />
	}

	const value = {
		isAdmin,
		isLoggedIn,
		isLoading,
		user,
		loginUser,
		getUser,
		getAllUsers,
		users,
		setIsLoading,
		addTask,
		getMyTasks,
		myTasks,
		getAssignedTasks,
		assignedTasks,
		updateTaskStaus,
		logout
	}
	return <userContext.Provider value={value}>{children}</userContext.Provider>
}

export default UserProvider
export { userContext }
