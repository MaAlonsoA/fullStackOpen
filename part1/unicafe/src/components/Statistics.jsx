import React from "react";
import Statistic from "./Statistic";

const Statistics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;

	if (total > 0) {
		const average = (good * 1 + bad * -1) / total;
		const positivePercet = good / total;
		return (
			<div>
				<h1>Statistics</h1>
				<Statistic text={"Good"} value={good} />
				<Statistic text={"Neutral"} value={neutral} />
				<Statistic text={"Bad"} value={bad} />
				<Statistic text={"Total"} value={total} />
				<Statistic text={"Average"} value={average} />
				<Statistic text={"Positive"} value={positivePercet}/>
			</div>
		);
	} else {
		return (
			<div>
				<h1>Statistics</h1>
				<p>No feedback given</p>
			</div>
		);
	}
};

export default Statistics;
