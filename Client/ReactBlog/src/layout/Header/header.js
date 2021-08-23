import React from 'react'
import LoginBox from './LoginBox'
import Navbar from './navbar'
import ProfileButton from './ProfileButton'
import { selectUser, selectIsAuthenticated } from '../../features/login/authSlice'
import { useSelector } from 'react-redux'


const Header = () => {
	const isLoggedIn = useSelector(selectIsAuthenticated)
	const user = useSelector(selectUser)

	console.log(user,isLoggedIn)
	return (
		<header className='h-36 col-span-3 flex flex-wrap items-start bg-purple-300'>
			{isLoggedIn ?
				<ProfileButton user={user} /> :
				<LoginBox />
			}
			<Navbar />
		</header>
	)
}

export default Header