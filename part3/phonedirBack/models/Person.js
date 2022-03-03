/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name is to short, got {VALUE}'],
    maxlength: [30, 'Name is to long, got {VALUE}'],
    required: [true, 'Name required'],
    unique: [true, '{VALUE} already exist'],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'User phone number required'],
    validate: {
      validator(val) {
        return val.toString().length >= 8 && val.toString().length <= 10;
      },
      message: (val) => `${val.value} has to be between 6 and 10 digits`,
    },
    unique: [true, '{VALUE} already exist'],
  },
});
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model('Person', personSchema);
