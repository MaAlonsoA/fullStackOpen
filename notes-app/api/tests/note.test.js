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

describe('POST', () => {
  test('POST a valid note', async () => {
    const newNote = { content: 'A valid Note', important: true };

    await api.post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const { response, contents } = await getAllNotes();
    expect(response.body).toHaveLength(initialNotes.length + 1);
    expect(contents).toContain(newNote.content);
  });

  test('POST fails with a proper status code and message if content is missing', async () => {
    const newNote = { important: true };

    const result = await api.post('/api/notes')
      .send(newNote)
      .expect(400);

    expect(result.body.error)
      .toContain('User validation failed: content: content is missing');

    const { response } = await getAllNotes();
    expect(response.body).toHaveLength(initialNotes.length);
  });

  test('POST fails with a proper status code and message if important is missing', async () => {
    const newNote = { content: 'Invalid note without important' };

    const result = await api.post('/api/notes')
      .send(newNote)
      .expect(400);

    expect(result.body.error)
      .toContain('User validation failed: important: iimportant is missing');

    const { response, contents } = await getAllNotes();
    expect(response.body).toHaveLength(initialNotes.length);
    expect(contents).not.toContain(newNote.content);
  });
});
afterAll(() => {
  mongoose.connection.close();
  closeServer();
});
