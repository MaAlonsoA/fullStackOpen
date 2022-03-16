import Note from '../models/note.models.js';
import User from '../models/user.models.js';

export const getNotes = async (req, res, next) => {
  try {
    const notesFound = await Note.find({});
    res.status(200).json(notesFound);
  } catch (e) {
    next(e);
  }
};

export const getNote = async (req, res, next) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id).orFail();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const postNote = async (req, res, next) => {
  const { content, important } = req.body;
  const { userId } = req;
  const newNote = new Note({
    content, important, date: new Date(), user: userId,
  });

  try {
    // const person = await User.findById(userId);
    if (!await User.findById(userId)) {
      const errorMessage = { name: 'InvalidUserId', message: 'UserId not found' };
      throw errorMessage;
    }
    const savedNote = await newNote.save();
    await User.findByIdAndUpdate(userId, { $push: { notes: savedNote.id } });
    res.status(200).json(savedNote);
  } catch (e) {
    next(e);
  }
};

export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const noteToDelete = await Note.findById(id).orFail();
    if (userId === noteToDelete.user.toString()) {
      await Note.findByIdAndDelete(id);
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { userId, body } = req;
  const { content, important } = body;

  try {
    const noteToUpdate = await Note.findById(id).orFail();
    if (userId === noteToUpdate.user.toString()) {
      const updatedNote = await Note.findByIdAndUpdate(id, { content, important }, { new: true });
      res.status(200).json(updatedNote);
    }
  } catch (error) {
    next(error);
  }
};
