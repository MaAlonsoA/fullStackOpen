import React from "react";
import { Person } from "./Person";

export const Persons = ({ personsToShow, handleDelete }) => {
	return personsToShow.map((person) => {
		return <Person {...person} key={person.id} handleDelete={handleDelete} />;
	});
};
