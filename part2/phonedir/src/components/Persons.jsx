import React from "react";
import { Person } from "./Person";

export const Persons = ({ personsToShow }) => {
	return personsToShow.map((person) => {
		return (
			<Person key={person.name} name={person.name} phone={person.number} />
		);
	});
};
