import React, { useState, useEffect } from "react";

import { getAllPersons } from "../services/persons/getAllPersons";
import { postNewPerson } from "../services/persons/postNewPerson";

import { Persons } from "./Persons";
import { Filter } from "./Filter";
import { Form } from "./Form";

export const App = () => {
	const [persons, setPersons] = useState([]);
	const [newEntry, setNewEntry] = useState();
	const [search, setSearch] = useState("");

	useEffect(() => {
		getAllPersons().then((persons) => {
			setPersons(persons);
		});
	}, []);

	const handleChange = (event) => {
		setNewEntry({
			...newEntry,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!newEntry || !newEntry.name || !newEntry.number) {
			return window.alert("Enter values");
		}

		if (
			persons.some((elem) => {
				return elem.name === newEntry.name;
			})
		) {
			return window.alert(`${newEntry} is already on the phonebook`);
		}

		postNewPerson(newEntry).then((response) => {
			setPersons(persons.concat(response));
			setNewEntry();
		});
		event.target.reset();
		setNewEntry();
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const personsToShow = search
		? persons.filter((person) =>
				person.name.toLowerCase().includes(search.toLowerCase())
		  )
		: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handleSearch={handleSearch} />
			<h2>Add new </h2>
			<Form handleSubmit={handleSubmit} handleChange={handleChange} />
			<h2>Numbers</h2>
			<Persons personsToShow={personsToShow} />
		</div>
	);
};
