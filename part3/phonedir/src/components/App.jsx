import React, { useState, useEffect } from "react";

import { getAllPersons } from "../services/persons/getAllPersons";
import { postNewPerson } from "../services/persons/postNewPerson";
import { deletePersonById } from "../services/persons/deletePersonById";
import { putPersonById } from "../services/persons/putPersonById";

import { Persons } from "./Persons";
import { Filter } from "./Filter";
import { Form } from "./Form";
import { Notification } from "./Notification";

export const App = () => {
	const [persons, setPersons] = useState([]);
	const [newEntry, setNewEntry] = useState();
	const [search, setSearch] = useState("");
	const [errorMessage, setErrorMessage] = useState({ type: "", message: "" });

	useEffect(() => {
		getAllPersons()
			.then((persons) => {
				setPersons(persons);
			})
			.catch((e) => {
				messageHandler("error", e.message, 3000);
			});
	}, []);

	const messageHandler = (type, message, time = 3000) => {
		setErrorMessage({
			type,
			message,
		});
		setTimeout(() => {
			setErrorMessage({
				type: "",
				message: "",
			});
		}, time);
	};

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
			const finded = persons.find((elem) => {
				return elem.name === newEntry.name;
			});
			if (
				window.confirm(
					`${newEntry.name} already exist, replace the old number with a new one`
				)
			) {
				return putPersonById(finded.id, newEntry)
					.then(() => {
						getAllPersons()
							.then((response) => {
								messageHandler(
									"success",
									`${finded.name} was successfully updated `,
									5000
								);
								setPersons(response);
							})
							.catch((e) => {
								messageHandler("error", e.message);
							});
					})
					.catch((e) => {
						console.log(e.message)
						messageHandler("error", `${finded.name} was already deleted `);
					});
			}
			return;
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

	const handleDelete = (id, name) => {
		if (window.confirm(`Delete ${name}`)) {
			deletePersonById(id)
				.then(() => {
					getAllPersons()
						.then((persons) => {
							setPersons(persons);
							messageHandler(
								"success",
								`${name} was successfully deleted `,
								5000
							);
						})
						.catch((e) => {
							messageHandler("error", e.message);
						});
				})
				.catch((e) => {
					messageHandler("error", e.message, 3000);
				});
		}
	};

	const personsToShow = search
		? persons.filter((person) =>
				person.name.toLowerCase().includes(search.toLowerCase())
		  )
		: persons;

	return (
		<div>
			{!errorMessage.type ? null : (
				<Notification type={errorMessage.type} message={errorMessage.message} />
			)}
			<h2>Phonebook</h2>
			<Filter handleSearch={handleSearch} />
			<h2>Add new </h2>
			<Form handleSubmit={handleSubmit} handleChange={handleChange} />
			<h2>Numbers</h2>
			<Persons personsToShow={personsToShow} handleDelete={handleDelete} />
		</div>
	);
};
