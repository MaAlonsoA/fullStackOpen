import axios from "axios";

export const putPersonById = (id, updatedPerson) => {
	return axios
		.put(`https://infinite-refuge-78583.herokuapp.com/api/persons/${id}`, updatedPerson)
		.then((response) => {
			const { data } = response;
			return data;
		});
};
