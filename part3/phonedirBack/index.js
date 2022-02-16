import express from 'express';

const app = express();

app.use(express.json());

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
  {
    name: 'Marcos',
    number: '23123123',
    id: 4,
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
