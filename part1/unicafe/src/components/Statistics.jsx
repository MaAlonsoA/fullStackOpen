import React from "react";

const Statistics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;
    const average = ((good * 1) + (bad * -1)) / total
	return (
		<div>
			<h1>Statistics</h1>
			<p>Good: {good}</p>
			<p>Neutral: {neutral}</p>
			<p>Bad: {bad}</p>
			<p>Total: {total}</p>
			<p>Average: {average} </p>
			<p>Positive: {good / total}%</p>
		</div>
	);
};

export default Statistics;
