import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 1,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 2,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 3,
  },
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const data = persons.find((person) => person.id === id);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const { body } = req;
  if (!body.name || !body.number || persons.some((elem) => elem.name === body.name)) {
    res.status(400).json();
  } else {
    const ids = persons.map((person) => person.id);
    const maxId = Math.max(...ids);

    const newPerson = {
      name: body.name,
      number: body.number,
      id: maxId + 1,
    };
    persons = persons.concat(newPerson);
    res.json(newPerson);
  }
});

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length}<p>
  <p>${new Date()}</p>`);
});

app.put('/api/persons/:id', (req, res) => {
  const { body } = req;

  const id = Number(req.params.id);
  const index = persons.findIndex((elem) => elem.id === id);
  if (index >= 0) {
    persons[index] = {
      name: body.name,
      number: body.number,
      id: req.params.id,
    };
  } else {
    res.status(404).json();
  }
  res.status(200).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
