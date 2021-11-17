import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PostView } from '../features/posts/posts'
import { SinglePost } from '../features/posts/posts'
import { UsersList } from '../features/users/users'
import { SingleUser } from '../features/users/users'
import { PostForm } from '../features/posts/posts'
import { NotFound } from '../common/components/NotFound'
import { useRefreshToken } from '../common/hooks'
//import UsersList from '../features/users/usersList'
//import singleUser from '../features/users/singleUser'

const App = () => {
  useRefreshToken()
  return (
    <Switch>
      <Route exact path="/blogs/:blogId">
        <SinglePost />
      </Route>
      <Route exact path="/users">
        <UsersList />
      </Route>
      <Route path="/users/:userId">
        <SingleUser />
      </Route>
      <Route exact path="/">
        <PostView />
      </Route>
      <Route path="/newpost">
        <PostForm />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default App
