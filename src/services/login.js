import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log("DE LOGIN RESPONSE.DATA", response.data);
  return response.data;
};

export default { login };
