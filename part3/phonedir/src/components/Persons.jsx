/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';
import { Person } from './Person';

export function Persons({ personsToShow, handleDelete }) {
  return personsToShow.map((person) => <Person {...person} key={person.id} handleDelete={handleDelete} />);
}
