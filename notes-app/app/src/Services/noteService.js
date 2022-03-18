import axios from 'axios';

let token = null;
export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
export async function getAllNotes() {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.get('http://localhost:3001/api/notes', config);
  return data;
}

export async function postNote(newNote) {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.post('http://localhost:3001/api/notes', newNote, config);
  return data;
}

export async function putNote(noteToUpdate) {
  const config = {
    headers: { Authorization: token },
  };
  const { data } = await axios.put(`http://localhost:3001/api/notes/${noteToUpdate.id}`, noteToUpdate, config);
  return data;
}
