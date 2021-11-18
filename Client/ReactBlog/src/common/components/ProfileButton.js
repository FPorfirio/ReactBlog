import React from 'react'
import { useDispatch } from 'react-redux'
import ProfileLogo from '../../assets/man.svg'
import ArrowIcon from '../../assets/chevron.js'
import { Link as RouterLink } from 'react-router-dom'
import { logout } from '../../features/auth/authSlice'
import {
  forwardRef,
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
} from '@chakra-ui/react'

const CustomButton = forwardRef((props, ref) => {
  return (
    <Box
      as="button"
      display="flex"
      gap="0.5rem"
      alignItems="flex-end"
      height="100%"
      width="100%"
      ref={ref}
      {...props}
    >
      <div className="self-stretch">
        <Avatar w="100%" h="100%" src={ProfileLogo}></Avatar>
      </div>
      <span className="px-1 md:text-lg">{props.user.name}</span>
      <div className="self-stretch flex-grow menuArrowIcon flex items-center justify-center">
        <ArrowIcon
          className={`w-6 h-6 p-0.5 rounded-xl bg-gray-600 transition duration-500 ease-in-out ${
            props.isOpen ? 'transform rotate-90' : ''
          }`}
        />
      </div>
    </Box>
  )
})
//la base del boton custom tiene que ser siempre 100
const ProfileBox = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <div className="h-10 self-end mr-2 rounded-md shadow overflow-hidden menuProfile md:h-14 md:mr-11 md:mt-1 md:self-start">
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isOpen={isOpen}
              user={user}
              as={CustomButton}
            ></MenuButton>
            <MenuList>
              <MenuItem>
                <Link to={`/users/${user.id}`} as={RouterLink}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(logout())
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </div>
  )
}

export default ProfileBox
