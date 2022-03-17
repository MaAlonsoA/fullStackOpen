import axios from 'axios';

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const baseUrl = 'http://localhost:3001/api/blogs';

export const getAllBlogs = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

export const postNewBlog = async (newNote) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.post(baseUrl, newNote, config);
};
