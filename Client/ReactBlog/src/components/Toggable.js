import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)
	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisivility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisivility,
			visible
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={() => {toggleVisivility()}}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisivility}>Cancel</button>
			</div>
		</div>
	)
})

Toggable.displayName = 'Togglable'

Toggable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

export default Toggable