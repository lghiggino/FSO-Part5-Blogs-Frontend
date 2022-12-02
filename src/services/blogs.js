import axios from "axios";
const baseUrl = "/api/blogs";
import jwt_decode from "jwt-decode";

let token = null;
let id = null;
let author = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const setUserId = (userId) => {
  id = userId;
};

const setAuthor = (authorName) => {
  author = authorName;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = axios.post(
    baseUrl,
    { ...newBlog, userId: id, author },
    config
  );

  return response.data;
};

const update = (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = axios.put(
    `${baseUrl}/${id}`,
    { ...updatedBlog, userId: id },
    config
  );
  return response.data;
};

export default { getAll, create, update, setToken, setUserId, setAuthor };
