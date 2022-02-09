import React from "react";

const Statistic = ({ text, value }) => {
	if (text !== "Positive") {
		return (
			<>
				<td>{text}</td>
				<td>{value}</td>
			</>
		);
	} else {
		return (
			<>
				<td>{text}</td>
				<td>{value}%</td>
			</>
		);
	}
};

export default Statistic;
