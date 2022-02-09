import React, { useState } from "react";

import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const increaseGood = () =>
		setGood((prevGood) => {
			return prevGood + 1;
		});

	const increaseNeutral = () =>
		setNeutral((prevNeutral) => {
			return prevNeutral + 1;
		});

	const increaseBad = () =>
		setBad((prevBad) => {
			return prevBad + 1;
		});

	return (
		<div
			style={{
				position: "absolute",
				marginLeft: "50%",
				width: "300px",
				height: "100px",
			}}
		>
			<h1>Rate us!</h1>
			<Button
				style={{
					fontSize: "12px",
					width: "100px",
					height: "100px",
					backgroundColor: "#88FF82",
				}}
				name="GOOD"
				onClick={increaseGood}
			/>
			<Button
				style={{
					fontSize: "12px",
					width: "100px",
					height: "100px",
					backgroundColor: "#C4C2C5",
				}}
				name="NEUTRAL"
				onClick={increaseNeutral}
			/>
			<Button
				style={{
					fontSize: "12px",
					width: "100px",
					height: "100px",
					backgroundColor: "#FF4242",
				}}
				name="BAD"
				onClick={increaseBad}
			/>

			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
