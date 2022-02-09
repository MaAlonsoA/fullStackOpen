import React from "react";

const Statistic = ({ text, value }) => {
	if (text !== "Positive") {
		return (
			<p>
				{text} {value}
			</p>
		);
	} else {
		return (
			<p>
				{text} {value}%
			</p>
		);
	}
};

export default Statistic;
