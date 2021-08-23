import React from 'react'
import PropTypes from 'prop-types'
import '../index.css'

const Notification = ({ notification }) => {

	if(notification.type == 'error'){
		return (
			<div className='error'>
				<p>{notification.message}</p>
			</div>
		)
	} else if(notification.type == 'success'){
		return (
			<div className='success'>
				<p>{notification.message}</p>
			</div>
		)
	}
	return null
}

Notification.propTypes = {
	notification: PropTypes.object.isRequired
}

Notification.displayName = 'Notification'

export default Notification