import React from "react";

export const Person = ({ name, number, id, handleDelete }) => {
	return (
		<p>
			{name}: {number}
			<button onClick={() => handleDelete(id, name)}>Delete</button>
		</p>
	);
};
