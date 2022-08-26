import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = (token) => {
  const request = axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return request.then((response) => response.data);
};

const create = (content) => {
  const request = axios.post(
    baseUrl,
    { title: content.title, author: content.author, url: content.url },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return request.then((response) => response.data);
};

const update = (blog) => {
  const request = axios.put(
    `${baseUrl}/${blog.id}`,
    {
      title: blog.title,
      url: blog.url,
      author: blog.url,
      likes: blog.likes,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return request.then(
    (response) => response.data,
    (error) => error.response
  );
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return request.then(
    (response) => response.data,
    (error) => error.response.data
  );
};

export default { getAll, create, update, remove };
