import axios from "axios";

export const deletePersonById = (id) => {
	return axios
		.delete(`http://localhost:3001/api/persons/${id}`)
		.then((response) => {
			return response;
		});
};
