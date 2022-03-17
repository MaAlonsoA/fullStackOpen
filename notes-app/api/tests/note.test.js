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
  await initNotes(headers);
});

describe('GET', () => {
  test('GET notes as JSON', async () => {
    await api.get('/api/notes')
      .expect(200)
      .set(headers)
      .expect('Content-Type', /application\/json/);
  });

  test('GET all notes', async () => {
    const { response } = await getAllNotes(headers);
    expect(response.body).toHaveLength(initialNotes.length);
  });
  test('GET note by id', async () => {
    const { response: notesInDB } = await getAllNotes(headers);
    const noteToFind = notesInDB.body[0];
    const result = await api.get(`/api/notes/${noteToFind.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(result.body.content).toEqual(notesInDB.body[0].content);
  });
  test('GET fails with a proper estatus code and message if id does not exist ', async () => {
    const { response: notesInDB } = await getAllNotes(headers);
    const noteToFind = notesInDB.body[0];

    await api.delete(`/api/notes/${noteToFind.id}`)
      .set(headers);

    await api.get(`/api/notes/${noteToFind.id}`)
      .expect(404);
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

    const { response, contents } = await getAllNotes(headers);
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

    const { response } = await getAllNotes(headers);
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

    const { response, contents } = await getAllNotes(headers);
    expect(response.body).toHaveLength(initialNotes.length);
    expect(contents).not.toContain(newNote.content);
  });

  test('POST fails with a proper status code and message if JWT is missing', async () => {
    const newNote = { content: 'A valid Note without jwt', important: true };

    const result = await api.post('/api/notes')
      .send(newNote)
      .expect(401);
    expect(result.body.error)
      .toContain('jwt must be provided');
  });

  test('POST fails with a proper status code and message if JWT is malformed', async () => {
    const newNote = { content: 'A valid Note without jwt', important: true };
    const badHeaders = { Authorization: 'dwadawd' };
    const result = await api.post('/api/notes')
      .send(newNote)
      .set(badHeaders)
      .expect(401);
    expect(result.body.error)
      .toContain('jwt must be provided');
  });
});

describe('DELETE', () => {
  test('DELETE a note by id', async () => {
    const { response: notesInDB } = await getAllNotes(headers);
    const noteToDelete = notesInDB.body[0];

    await api.delete(`/api/notes/${noteToDelete.id}`)
      .set(headers)
      .expect(200);
  });
  test('DELETE fails with a proper estatus code and message if id does not exist ', async () => {
    const { response: notesInDB } = await getAllNotes(headers);
    const notesToDelete = notesInDB.body[0];

    await api.delete(`/api/notes/${notesToDelete.id}`)
      .set(headers);
    // try to delete again. This time the id does not exist because is already deleted
    const result = await api.delete(`/api/notes/${notesToDelete.id}`)
      .set(headers)
      .expect(404);
    expect(result.body.error).toContain('Note not found');
  });
  test('DELETE fails with a proper estatus code and message if JWT is missing', async () => {
    const { response: notesInDB } = await getAllNotes(headers);
    const notesToDelete = notesInDB.body[0];

    const result = await api.delete(`/api/notes/${notesToDelete.id}`)
      .expect(401);
    expect(result.body.error).toContain('jwt must be provided');
  });
  test('DELETE fails with a proper estatus code and message if JWT is malformed', async () => {
    const { response: notesInDB } = await getAllNotes(headers);
    const notesToDelete = notesInDB.body[0];

    const badHeaders = { Authorization: 'dwadawd' };
    const result = await api.delete(`/api/notes/${notesToDelete.id}`)
      .set(badHeaders)
      .expect(401);
    expect(result.body.error).toContain('jwt must be provided');
  });
});

describe('PUT', () => {
  test('PUT a note by Id', async () => {
    const { response: notesInDB } = await getAllNotes(headers);
    const noteToUpdate = notesInDB.body[0];
    noteToUpdate.content = 'Updated';

    await api.put(`/api/notes/${noteToUpdate.id}`)
      .send(noteToUpdate)
      .set(headers)
      .expect(200);
    const { response: updatedNotes } = await getAllNotes(headers);
    expect(updatedNotes.body[0].content).toEqual('Updated');
  });
  test('PUT fails with a proper estatus code and message if id does not exist ', async () => {
    const { response: notesInDB } = await getAllNotes(headers);
    const noteToUpdate = notesInDB.body[0];

    await api.delete(`/api/notes/${noteToUpdate.id}`)
      .set(headers);

    await api.put(`/api/notes/${noteToUpdate.id}`)
      .send(noteToUpdate)
      .set(headers)
      .expect(404);
  });
  test('PUT fails with a proper estatus code and message if JWT is missing', async () => {
    const { response: notesInDB } = await getAllNotes(headers);
    const noteToUpdate = notesInDB.body[0];

    const result = await api.put(`/api/notes/${noteToUpdate.id}`)
      .expect(401);
    expect(result.body.error).toContain('jwt must be provided');
  });
  test('PUT fails with a proper estatus code and message if JWT is malformed', async () => {
    const { response: notesInDB } = await getAllNotes(headers);
    const noteToUpdate = notesInDB.body[0];

    const badHeaders = { Authorization: 'dwadawd' };
    const result = await api.put(`/api/notes/${noteToUpdate.id}`)
      .set(badHeaders)
      .expect(401);
    expect(result.body.error).toContain('jwt must be provided');
  });
});

afterAll(() => {
  mongoose.connection.close();
  closeServer();
});
