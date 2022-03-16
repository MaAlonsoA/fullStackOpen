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

export const initNotes = async () => {
  await wipeNotes();
  // eslint-disable-next-line no-restricted-syntax
  for await (const elem of initialNotes) {
    const newNote = new Note(elem);
    await newNote.save();
  }
};

export const getAllNotes = async () => {
  const response = await api.get('/api/notes');
  return {
    response,
    contents: response.body.map((note) => note.content),
  };
};
