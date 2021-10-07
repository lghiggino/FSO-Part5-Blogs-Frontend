import { useState, useContext } from "react"
import { LoggedInUserContext } from "../contexts/LoggedInUser"

export default function BlogForm() {
    const { user, setUser } = useContext(LoggedInUserContext)

    const [blog, setBlog] = useState({
        title: "",
        author: "",
        url: "",
    })

    function postBlog() {
        console.log(blog)
    }

    function logout() {
        localStorage.removeItem("blogsAppUser")
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
                    maxWidth: "200px"
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