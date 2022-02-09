import React from "react";

const Button = ({ style, name, onClick }) => {
	return (
		<button style={style} onClick={onClick}>
			{name}
		</button>
	);
};

export default Button;
