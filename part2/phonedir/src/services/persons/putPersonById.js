import axios from "axios";

export const putPersonById = (id, updatedPerson) => {
	return axios
		.put(`http://localhost:3001/persons/${id}`, updatedPerson)
		.then((response) => {
			const { data } = response;
			return data;
		});
};
