import React from "react";

export const Filter = ({ handleSearch }) => {
	return (
		<div>
			<input type="text" placeholder="Search" onChange={handleSearch} />
		</div>
	);
};
