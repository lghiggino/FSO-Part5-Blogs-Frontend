import { useState } from "react"

export default function BlogForm() {
    const [blog, setBlog] = useState({
        title: "",
        author: "",
        url: "",
    })

    function postBlog(){
        console.log(blog)
    }

    return (
        <>
            <label htmlFor="title">Title</label>
            <input
                name="title"
                id="title"
                value={blog.title}
                onChange={(event) => { setBlog({ ...blog, title: event.target.value }) }}
            />
            <label htmlFor="author">Author</label>
            <input
                name="author"
                id="author"
                value={blog.author}
                onChange={(event) => { setBlog({ ...blog, author: event.target.value }) }}
            />
            <label htmlFor="url">URL</label>
            <input
                name="url"
                id="url"
                value={blog.url}
                onChange={(event) => { setBlog({ ...blog, url: event.target.value }) }}
            />
            <button onClick={postBlog}>Post</button>
        </>
    )
}