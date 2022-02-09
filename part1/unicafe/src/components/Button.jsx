import React from "react";

const Button = ({ style, name, onClick, value}) => {
	return <button  style={style} onClick={onClick}>{name} {value}</button>;
};

export default Button