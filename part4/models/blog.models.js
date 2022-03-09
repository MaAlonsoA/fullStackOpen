/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is missing'] },
  author: { type: String, required: [true, 'Author is missing'] },
  url: { type: String, required: [true, 'URL is missing'] },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Blog', blogSchema);
