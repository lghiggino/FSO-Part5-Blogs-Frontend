import axios from 'axios'
const baseUrl = '/api/blogs'

async function getAll () {
  const request = await axios.get(baseUrl)
  return request.data
}

export default { getAll }