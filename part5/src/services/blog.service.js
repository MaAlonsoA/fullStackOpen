import axios from 'axios';

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const baseUrl = 'http://localhost:3001/api/blogs/';

export const getAllBlogs = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

export const postNewBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.post(baseUrl, newBlog, config);
};

export const updateBlog = async (newBlog, id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.put(baseUrl + id, newBlog, config);
};

export const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(baseUrl + id, config);
};
