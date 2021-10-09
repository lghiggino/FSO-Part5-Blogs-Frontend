import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogService'

import { LoggedInUserContext } from './contexts/LoggedInUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("blogsAppUser")) {
      const user = localStorage.getItem("blogsAppUser")
      setUser(JSON.parse(user))
    }
  }, [])


  async function getAllBlogs() {
    try {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage("")
      }, 5000)
    }
  }

  useEffect(() => {
    (async () => {
      await getAllBlogs()
    })()
  }, [])

  return (
    <LoggedInUserContext.Provider value={{ user, setUser, errorMessage, setErrorMessage }}>
      <div>
        <h2>{user ? "blogs" : "Log in to the application"}</h2>
        {user ?
          <BlogForm getAllBlogs={getAllBlogs}/>
          :
          <LoginForm setErrorMessage={setErrorMessage} />
        }
        <br />
        <br />
        {errorMessage && <div><h4 style={{color: "red"}}>{errorMessage}</h4></div>}
        <div >
          {blogs.map((blog, idx) =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    </LoggedInUserContext.Provider>
  )
}

export default App