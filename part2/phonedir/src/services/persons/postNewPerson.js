import axios from "axios";

export const postNewPerson = (newPerson) => {
	return axios
		.post("http://localhost:3001/persons", newPerson)
		.then((response) => {
			const { data } = response;
			return data;
		});
};
