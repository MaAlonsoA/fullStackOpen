import axios from 'axios';

async function login(credentials) {
  const { data } = await axios.post('http://localhost:3001/api/login', credentials);
  return data;
}

export default login;
