import React, { useState, useEffect } from "react";
import axios from "axios";

export const Weather = ({ capital }) => {
	const [weather, setWeather] = useState([]);

	useEffect(() => {
		const params = {
			access_key: process.env.REACT_APP_API_KEY,
			query: capital,
		};
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${params.access_key}&query=${params.query}`
			)
			.then((response) => {
				const { data } = response;
				setWeather([data]);
			});
	}, [capital]);
	if (weather[0]) {
		return (
			<div>
				<p>Temperature {weather[0].current.temperature}</p>
				<img src={weather[0].current.weather_icons} alt="icon" />
				<p>
					Wind: {weather[0].current.wind_speed} {weather[0].current.wind_dir}
				</p>
			</div>
		);
	}
	return <p>Not weather data</p>;
};
