import express from 'express';

const app = express();

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

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length}<p>
  <p>${new Date()}</p>`);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
