import React from "react";

export const Person = ({ name, number, id, handleDelete }) => {
	return (
		<div className="person">
			{name}: {number}
			<button onClick={() => handleDelete(id, name)}>Delete</button>
		</div>
	);
};
