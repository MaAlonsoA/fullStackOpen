import React, { useState, useEffect } from "react";

import { CountriesList } from "./CountriesList";
import { getAllCountries } from "../services/getAllCoountries";
import { Filter } from "./Filter";

export const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		getAllCountries().then((getCountries) => {
			setCountries(getCountries);
		});
	}, []);

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const countriesToShow = search
		? countries.filter((country) => {
				return country.name.official
					.toLowerCase()
					.includes(search.toLocaleLowerCase());
		  })
		: countries;
	return (
		<div>
			<Filter handleSearch={handleSearch} />
			{countriesToShow.length > 10 ? (
				<p>Too many matches </p>
			) : (
				<CountriesList countriesList={countriesToShow} setSearch={setSearch} />
			)}
		</div>
	);
};
