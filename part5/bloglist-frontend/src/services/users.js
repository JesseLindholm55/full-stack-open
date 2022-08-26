import axios from "axios";
const baseUrl = "/api/users";

const getUsers = (token) => {
  const request = axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.then((response) => response.data);
};

export default { getUsers };
