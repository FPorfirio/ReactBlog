import React from 'react'
import { NavLink as RouterLink, useLocation } from 'react-router-dom'
import { Link } from '@chakra-ui/layout'
import { selectIsAuthenticated } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'

const Navbar = ({ className }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const location = useLocation()
  const isActive = (linkName) => {
    return linkName === location.pathname
  }
  return (
    <>
      <nav className="w-full h-12 text-indigo-100 text-lg md:text-xl bg-navbar-bg md:self-end flex font-mono gap-6">
        <ul className="ml-4 h-full flex flex-row items-center gap-5 ">
          <li>
            <Link
              variant="navLink"
              textDecoration={isActive('/') ? 'overline' : 'none'}
              as={RouterLink}
              to="/"
            >
              <span>Home</span>
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                variant="navLink"
                textDecoration={isActive('/users') ? 'overline' : 'none'}
                as={RouterLink}
                to="/users"
              >
                <span>Users</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
