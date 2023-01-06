import axios from "axios";
const baseUrl = "/api/blogs";

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

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await axios.post(
    baseUrl,
    { ...newBlog, userId: id, author },
    config
  );

  return data;
};

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseUrl}/${id}`,
    { ...updatedBlog, userId: id },
    config
  );
  return response.data;
};

const addLike = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${id}/addlike`,
    { userId: id },
    config
  );
  return response.data;
};

export default { getAll, create, update, setToken, setUserId, setAuthor, addLike };
