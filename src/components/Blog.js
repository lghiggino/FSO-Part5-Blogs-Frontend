import React from 'react'

const Blog = ({ blog }) => {
  return (
    <div style={
      {
        display: "flex",
        flexDirection: "row",
        maxWidth: "50vw"
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