import axios from "axios";

export const getWeather = (city) => {
	const params = {
		access_key: process.env.REACT_APP_API_KEY,
		query: city,
	};
	return axios
		.get(
			`http://api.weatherstack.com/current?access_key=${params.access_key}&query=${params.query}`
		)
		.then((response) => {
			const { data } = response;
			return data;
		})
		.catch((e) => {
			console.log(e);
		});
};
