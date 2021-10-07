import React, { useState, useEffect, useContext } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogs'

import { LoggedInUserContext } from './contexts/LoggedInUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <LoggedInUserContext.Provider value={{ user, setUser, errorMessage, setErrorMessage }}>
      <div>
        <h2>{user ? "blogs" : "Log in to the application"}</h2>
        {user ?
          <BlogForm />
          :
          <LoginForm setErrorMessage={setErrorMessage} />
        }
        <br />
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </LoggedInUserContext.Provider>
  )
}

export default App