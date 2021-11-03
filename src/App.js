import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import blogService from './services/blogService'

import { LoggedInUserContext } from './contexts/LoggedInUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({ message: "", variant: "" })
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showBlogForm, setShowBlogForm] = useState(false)

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
      setNotificationMessage({ message: `Failure loading blogs ${error.message}`, variant: "error" })
      setTimeout(() => {
        setNotificationMessage({ message: "", variant: "" })
      }, 5000)
    }
  }

  useEffect(() => {
    (async () => {
      await getAllBlogs()
    })()
  }, [])

  return (
    <LoggedInUserContext.Provider value={{ user, setUser, errorMessage: notificationMessage, setErrorMessage: setNotificationMessage }}>
      <div>
        <h2>{user ? "blogs" : "Log in to the application"}</h2>

        {!user &&
          <button
            onClick={() => { setShowLoginForm(!showLoginForm) }}
          >
            {showLoginForm ? "Cancel" : "Login"}
          </button>
        }

        {showLoginForm && <LoginForm setNotificationMessage={setNotificationMessage} setShowLoginForm={setShowLoginForm} />}

        {user && showBlogForm &&
          <BlogForm getAllBlogs={getAllBlogs} setNotificationMessage={setNotificationMessage} />
        }
        <br />
        <br />
        <div>
          <button
            onClick={() => {
              setShowBlogForm(!showBlogForm)
            }}>
            {showBlogForm ? "Cancel" : "Create New Blog"}
          </button>
        </div>
        <br />
        <br />
        {notificationMessage &&
          <div>
            <h4 style={
              notificationMessage.variant === "success" ?
                { color: "blue" }
                :
                notificationMessage.variant === "error" ?
                  { color: "red" }
                  :
                  { color: "black" }}
            >
              {notificationMessage.message}
            </h4>
          </div>
        }
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