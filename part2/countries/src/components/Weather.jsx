import React, { useState, useEffect } from "react";

import { getWeather } from "../services/getWeather";

export const Weather = ({ capital }) => {
	const [weather, setWeather] = useState([]);

	useEffect(() => {
		getWeather(capital).then((response) => {
			if (response.success === false) {
				return;
			}
			setWeather([response]);
		});
	}, [setWeather, capital]);

	if (weather.length > 0) {
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
