/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    red: 'User',
  },
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Note', noteSchema);
