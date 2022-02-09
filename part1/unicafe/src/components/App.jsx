import React, { useState } from "react";

import Button from "./Button";

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
				left: "50%",
				top: "50%",
			}}
		>
			<Button
				style={{ fontSize: "25px", margin: '0.5em', padding: '15px'}}
				name="GOOD"
				onClick={increaseGood}
				value={good}
			/>
			<Button
				style={{ fontSize: "25px", margin: '0.5em', padding: '15px'}}
				name="NEUTRAL"
				onClick={increaseNeutral}
				value={neutral}
			/>
			<Button
				style={{ fontSize: "25px", margin: '0.5em', padding: '15px'}}
				name="BAD"
				onClick={increaseBad}
				value={bad}
			/>
		</div>
	);
};

export default App;
