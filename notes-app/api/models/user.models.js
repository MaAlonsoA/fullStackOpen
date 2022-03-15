/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: [3, 'User name is to short'],
    maxlength: [9, 'User name is to long'],
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minlength: [3, 'User name is to short'],
    maxlength: [12, 'User name is to long'],
  },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
  }],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
