import React from "react";

export const Person = ({ name, phoneNumber, id, handleDelete }) => {
	return (
		<div className="person">
			{name}: {phoneNumber}
			<button onClick={() => handleDelete(id, name)}>Delete</button>
		</div>
	);
};
