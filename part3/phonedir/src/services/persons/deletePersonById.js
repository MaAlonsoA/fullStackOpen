import axios from "axios";

export const deletePersonById = (id) => {
	return axios
		.delete(`https://infinite-refuge-78583.herokuapp.com/api/persons/${id}`)
		.then((response) => {
			return response;
		});
};
