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
