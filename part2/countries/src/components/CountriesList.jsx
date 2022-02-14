import React from "react";

import { Country } from "./Country";

export const CountriesList = ({ countriesList, setSearch }) => {
	if (countriesList.length > 1) {
		return (
			<div>
				{countriesList.map((country) => {
					return (
						<p key={country.name.official}>
							{country.name.official}{" "}
							<button
								onClick={() =>
									setSearch(
										(prevSearch) => (prevSearch = country.name.official)
									)
								}
							>
								SHOW
							</button>
						</p>
					);
				})}
			</div>
		);
	}
	return (
		<div>
			{countriesList.map((country) => {
				return <Country key={country.name.official} {...country} />;
			})}
		</div>
	);
};
