import { useState, useContext } from "react"
import { LoggedInUserContext } from "../contexts/LoggedInUser"
import blogService from "../services/blogService"


export default function BlogForm({ getAllBlogs, setNotificationMessage }) {
    const { user, setUser } = useContext(LoggedInUserContext)

    const [blog, setBlog] = useState({
        title: "",
        author: "",
        url: "",
    })

    async function postBlog() {
        const payload = {
            user: user,
            title: blog.title,
            author: blog.author,
            url: blog.url
        }
        try {
            const res = await blogService.createBlog(payload)
            console.log("res do postBlog", res)
            setNotificationMessage({ message: "Blog created successfully", variant: "success" })
            setBlog({
                title: "",
                author: "",
                url: "",
            })
            setTimeout(() => {
                setNotificationMessage({ message: "", variant: "" })
            }, 5000)
        } catch (error) {
            console.error(error.message)
            setNotificationMessage({ message: `Error creating blog - ${error.message}`, variant: "error" })
        } finally {
            getAllBlogs()
        }
    }

    function logout() {
        localStorage.removeItem("blogsAppUser")
        setUser(null)
        setNotificationMessage({ message: "logged out successfully", variant: "success" })
        setTimeout(() => {
            setNotificationMessage({ message: "", variant: "" })
        }, 5000)
    }

    return (
        <>
            <div style={
                {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "2rem"
                }
            }>
                <p>{user.name} is logged in</p>
                <button
                    onClick={logout}
                >logout
                </button>
            </div>

            <div style={
                {
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    alignItems: "center",
                    justifyContent: "start",
                    justifyItems: "stretch",
                    maxWidth: "200px",
                }
            }>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        id="title"
                        value={blog.title}
                        onChange={(event) => { setBlog({ ...blog, title: event.target.value }) }}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input
                        name="author"
                        id="author"
                        value={blog.author}
                        onChange={(event) => { setBlog({ ...blog, author: event.target.value }) }}
                    />
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input
                        name="url"
                        id="url"
                        value={blog.url}
                        onChange={(event) => { setBlog({ ...blog, url: event.target.value }) }}
                    />
                </div>

                <button onClick={postBlog}>Save Blog</button>

            </div>

        </>
    )
}