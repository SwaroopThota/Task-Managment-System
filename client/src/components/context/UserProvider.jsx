import React, { createContext, useState } from 'react'

const userContext = createContext()
const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
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
					authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			})
			res = await res.json()
			users = res.users
			setUsers(users)
		} catch (err) {
			alert(err)
		}
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
		setIsLoading
	}
	return <userContext.Provider value={value}>{children}</userContext.Provider>
}

export default UserProvider
export { userContext }
