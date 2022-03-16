/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: { type: String, required: [true, 'content is missing'] },
  date: Date,
  important: { type: Boolean, required: [true, 'important is missing'] },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
