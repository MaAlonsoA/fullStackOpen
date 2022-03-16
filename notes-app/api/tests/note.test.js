import mongoose from 'mongoose';
import { closeServer, api } from './helpers/test.helpers.js';
import {
  getAllNotes, initialNotes, initNotes, loginInitTestUser,
} from './helpers/note.helpers.js';

let headers = {};

beforeAll(async () => {
  headers = await loginInitTestUser();
});

beforeEach(async () => {
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
      .set(headers)
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
      .set(headers)
      .expect(400);

    expect(result.body.error)
      .toContain('Note validation failed: content: content is missing');

    const { response } = await getAllNotes();
    expect(response.body).toHaveLength(initialNotes.length);
  });

  test('POST fails with a proper status code and message if important is missing', async () => {
    const newNote = { content: 'Invalid note without important' };

    const result = await api.post('/api/notes')
      .send(newNote)
      .set(headers)
      .expect(400);

    expect(result.body.error)
      .toContain('Note validation failed: important: important is missing');

    const { response, contents } = await getAllNotes();
    expect(response.body).toHaveLength(initialNotes.length);
    expect(contents).not.toContain(newNote.content);
  });

  test('POST ails with a proper status code and message if JWT is missing', async () => {
    const newNote = { content: 'A valid Note without jwt', important: true };

    const result = await api.post('/api/notes')
      .send(newNote)
      .expect(401);
    expect(result.body.error)
      .toContain('jwt must be provided');
  });

  test('POST ails with a proper status code and message if JWT is malformed', async () => {
    const newNote = { content: 'A valid Note without jwt', important: true };
    headers = { Authorization: 'dwadawd' };
    const result = await api.post('/api/notes')
      .send(newNote)
      .set(headers)
      .expect(401);
    expect(result.body.error)
      .toContain('jwt must be provided');
  });
});
afterAll(() => {
  mongoose.connection.close();
  closeServer();
});
