import React from "react"

const Blog = ({ blog }) => {
    return (
        <div style={
            {
                display: "flex",
                flexDirection: "row",
                flex: 1,
            }
        }>
            <span style={
                {
                    flex: 2,
                }
            }>
                {blog.title}
            </span>

            <span style={
                {
                    flex: 1,
                }
            }>
                {blog.author}
            </span>

            <span style={
                {
                    flex: 1,
                }
            }>
                {blog.url}
            </span>


        </div>
    )
}



export default Blog