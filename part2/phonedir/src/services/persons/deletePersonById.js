import axios from "axios";

export const deletePersonById = (id) => {
	return axios
		.delete(`http://localhost:3001/persons/${id}`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			console.error(error);
			alert(error);
		});
};
