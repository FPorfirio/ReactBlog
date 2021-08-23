import React from 'react'
import { Button, Group, MantineProvider } from '@mantine/core'
import { Link } from 'react-router-dom'
import theme from '../../common/Themes/mantineTheme'



const LoginBox = () => {
	return (
		<MantineProvider theme={theme}>
			<div className='ml-auto mr-3 mt-3'>
				<Group>
					<Button
						component={Link}
						to="/login"
					>
						Login
					</Button>
					<Button
					>
						Logout
					</Button>
				</Group>
			</div>
		</MantineProvider>
	)
}

export default LoginBox