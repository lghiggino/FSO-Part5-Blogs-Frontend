import axios from "axios";
const baseUrl = "/api/blogs";
import jwt_decode from "jwt-decode";

let token = null;
let id = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const setUserId = (newToken) => {
  let decoded = jwt_decode(newToken);
  console.log(decoded.id);
  id = decoded.id;
};

const config = {
  headers: { Authorization: token },
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newBlog) => {
  const response = axios.post(baseUrl, { ...newBlog, userId: id }, config);
  return response.data;
};

const update = (id, updatedBlog) => {
  const response = axios.put(`${baseUrl}/${id}`, { ...updatedBlog, userId: id }, config);
  return response.data;
};

export default { getAll, create, update, setToken, setUserId };
