import Note from '../models/note.models.js';

// eslint-disable-next-line import/prefer-default-export
export const getNotes = async (req, res, next) => {
  try {
    const notesFound = await Note.find({});
    res.status(200).json(notesFound);
  } catch (e) {
    next(e);
  }
};

export const postNote = async (req, res, next) => {
  const { content, important } = req.body;
  const newNote = new Note({ content, important, date: new Date() });
  try {
    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (e) {
    next(e);
  }
};
