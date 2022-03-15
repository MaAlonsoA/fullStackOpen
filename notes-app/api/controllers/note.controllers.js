import Note from '../models/note.models.js';
import User from '../models/user.models.js';

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
