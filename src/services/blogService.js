import axios from 'axios'
const baseUrl = '/api/blogs'

async function getAll () {
  const request = await axios.get(baseUrl)
  return request.data
}

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

async function createBlog(payload){
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.post(baseUrl, payload, config)
  return request.data
}

export default { getAll, createBlog, setToken }