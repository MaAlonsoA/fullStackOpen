import React from "react";

export const Notification = ({ type, message }) => {
	return (
		<div>
			<p className={type}>{message}</p>
		</div>
	);
};
