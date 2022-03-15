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
