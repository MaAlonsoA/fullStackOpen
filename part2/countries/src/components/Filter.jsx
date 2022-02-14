import React from "react";

export const Filter = ({ handleSearch }) => {
	return (
		<div>
			<label>
				Find countries{" "}
				<input onChange={handleSearch} type="text" id="Find" name="Find" />
			</label>
		</div>
	);
};
