import React from "react";

export const Form = ({ handleSubmit, handleChange }) => {
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<input placeholder="Name" name="name" onChange={handleChange} />
				</div>
				<div>
					<input placeholder="Number" name="number" onChange={handleChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</div>
	);
};
