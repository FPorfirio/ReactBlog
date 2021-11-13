import React from 'react'
import LoginBox from './LoginBox'
import Navbar from './navbar'
import ProfileButton from './ProfileButton'
import {
  selectUser,
  selectIsAuthenticated,
} from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
import Logo from '../../assets/logo'

const Header = () => {
  const isLoggedIn = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  return (
    <header className="flex-col col-span-3 pt-2 flex flex-wrap items-start gap-3 justify-between bg-probando-back md:gap-0 md:pt-8 md:flex-row md:h-64">
      <Logo className="w-80 md:w-140 ml-8" />
      {isLoggedIn ? <ProfileButton user={user} /> : <LoginBox />}
      <Navbar />
    </header>
  )
}

export default Header
