import axios from "axios";

export const getAllCountries = () => {
	return axios.get("https://restcountries.com/v3.1/all").then((response) => {
		const { data } = response;
		return data;
	});
};
