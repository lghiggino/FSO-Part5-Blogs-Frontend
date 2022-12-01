import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (blogData, config) => {
  const request = axios.post(baseUrl, blogData, config);
};

export default { getAll, create };
