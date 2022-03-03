import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import 'dotenv/config';
import Person from './models/Person.js';

mongoose.connect(process.env.MONGO_DB_URI)
  .then((result) => {
    console.log('connected to MongoDB', result.connections[0].name);
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then((person) => {
    response.json(person);
  }).catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      return response.json(person);
    }
    return response.status(404).end();
  }).catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  }).catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;
  const newPerson = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber,
  });

  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  }).catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;
  const newPersonInfo = {
    name: body.name,
    phoneNumber: body.phoneNumber,
  };
  Person.findByIdAndUpdate(request.params.id, newPersonInfo, { runValidators: true }).then(() => {
    response.status(200).end();
  }).catch((error) => next(error));
});

app.use((error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  }
  next(error);
});

app.use((request, response) => {
  response.status(404).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
