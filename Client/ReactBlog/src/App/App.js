import React from 'react'
import {
	BrowserRouter as Router,
	Switch, Route
} from 'react-router-dom'
import BlogView from '../features/blogs/BlogView'
import SingleBlog from '../features/blogs/singleBlog'
import LoginPage from '../features/login/loginForm'
import UserList from '../features/users/usersList'
import SingleUser from '../features/users/singleUser'
import Header from '../layout/Header/header'
//import UsersList from '../features/users/usersList'
//import singleUser from '../features/users/singleUser'

const App = () => {
	return (
		<div className='bg-main-background'>
			<Router>
				<div className='grid grid-cols-3'>
					<Header />
					<Switch>
						<Route path='/blogs/:blogId'>
							<SingleBlog />
						</Route>
						<Route exact path='/users'>
							<UserList />
						</Route>
						<Route path='/users/:userId'>
							<SingleUser />
						</Route>
						<Route exact path="/">
							<BlogView />
						</Route>
						<Route path="/login">
							<LoginPage />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	)
}

export default App