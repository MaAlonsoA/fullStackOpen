import { api } from './test.helpers';
import Note from '../../models/note.models.js';

export const initialNotes = [
  {
    content: 'Mi primerita note',
    important: true,
    date: new Date(),
  },
  {
    content: 'Mi segundita nota',
    important: false,
    date: new Date(),
  }];

const wipeNotes = async () => {
  await Note.deleteMany();
};

const testUser = {
  username: 'TRoot',
  password: '1234556',
  name: 'Marcos',
};

const initTestUser = async () => {
  await api
    .post('/api/users')
    .send(testUser);
};

export const loginInitTestUser = async () => {
  await initTestUser();
  const result = await api
    .post('/api/login')
    .send(testUser);
  return {
    Authorization: `bearer ${result.body.token}`,
  };
};

export const initNotes = async (headers) => {
  await wipeNotes();
  // eslint-disable-next-line no-restricted-syntax
  for await (const elem of initialNotes) {
    await api.post('/api/notes')
      .set(headers)
      .send(elem);
  }
};

export const getAllNotes = async (headers) => {
  const response = await api.get('/api/notes').set(headers);
  return {
    response,
    contents: response.body.map((note) => note.content),
  };
};
