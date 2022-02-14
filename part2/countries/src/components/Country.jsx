import React from "react";

export const Country = ({ name, capital, flags, population, languages }) => {
	return (
		<div>
			<h1>Name: {name.official}</h1>
			<p>Capital: {capital}</p>
			<p>Population: {population}</p>
			{languages !== undefined && (
				<ul>
					<h2>Languages</h2>
					{Object.entries(languages).map((elem) => {
						return <li key={elem[0]}>{elem[1]}</li>;
					})}
				</ul>
			)}
			<img src={flags.png} alt={name.common + "-flag"} />
		</div>
	);
};
