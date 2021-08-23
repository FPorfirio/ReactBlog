import React from 'react'
import { UnstyledButton, Avatar, Menu, MenuItem, MenuLabel, Text } from '@mantine/core'
import ProfileLogo from '../../assets/man.svg'

const ProfileBox = ({ user }) => {
	const menuButton = (
		<UnstyledButton style={{ display:'flex', gap:'0.5rem', alignItems:'flex-end', height: '100%' }}>
			<Avatar size='lg' src={ ProfileLogo } />
			<Text>{user.name}</Text>
		</UnstyledButton>
	)

	return (
		<div className='w-36 ml-42'>
			<Menu position='bottom' control={menuButton}>
				<MenuLabel>Menu</MenuLabel>
				<MenuItem>Profile</MenuItem>
				<MenuItem>Blogs</MenuItem>
			</Menu>
		</div>
	)
}

export default ProfileBox