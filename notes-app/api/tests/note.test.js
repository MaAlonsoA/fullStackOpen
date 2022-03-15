import mongoose from 'mongoose';
import { closeServer, api } from './helpers/test.helpers.js';
import { getAllNotes, initialNotes, initNotes } from './helpers/note.helpers.js';

beforeAll(async () => {
  await initNotes();
});

describe('GET', () => {
  test('GET notes as JSON', async () => {
    await api.get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('GET all users', async () => {
    const { response } = await getAllNotes();
    expect(response.body).toHaveLength(initialNotes.length);
  });
});
afterAll(() => {
  mongoose.connection.close();
  closeServer();
});
