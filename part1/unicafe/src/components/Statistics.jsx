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
				<table>
					<tbody>
						<tr>
							<Statistic text={"Good"} value={good} />
						</tr>
						<tr>
							<Statistic text={"Neutral"} value={neutral} />
						</tr>
						<tr>
							<Statistic text={"Bad"} value={bad} />
						</tr>
						<tr>
							<Statistic text={"Total"} value={total} />
						</tr>
						<tr>
							<Statistic text={"Average"} value={average} />
						</tr>
						<tr>
							<Statistic text={"Positive"} value={positivePercet} />
						</tr>
					</tbody>
				</table>
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
