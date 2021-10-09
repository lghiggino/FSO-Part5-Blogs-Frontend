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

async function update(id, newObject){
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}


export default { getAll, setToken, createBlog, update }