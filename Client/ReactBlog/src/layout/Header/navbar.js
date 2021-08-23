import React from 'react'
import { Link } from 'react-router-dom'
import SVGlogo from '../../assets/logo'

const Navbar = () => {

	return (
		<nav className='w-full h-16 text-indigo-100 bg-gray-600 self-end flex gap-6'>
			<div>
				<Link to="/"><SVGlogo/></Link>
			</div>
			<ul className='h-full flex flex-row items-end gap-5 md:justify-evenly'>
				<li>
					<Link to='/'>
						<span>Blogs</span>
					</Link>
				</li>
				<li>
					<Link to='/users'>
						<span>Users</span>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar