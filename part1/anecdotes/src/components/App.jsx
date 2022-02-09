import React, { useState } from "react";

import Button from "./Button";

const App = ({ anecdotes }) => {
	const [selected, setSelected] = useState(0);
	const [votes, setVote] = useState(Array(anecdotes.length).fill(0));

	const randomice = () =>
		setSelected((prevSelected) => {
			var newSelect = Math.floor(Math.random() * anecdotes.length);
			if (newSelect === prevSelected) randomice();
			else return newSelect;
		});
	const voteUp = () =>
		setVote((prevValue) => {
			const copy = [...prevValue];
			copy[selected] = prevValue[selected] + 1;
			return copy;
		});

	const anecdoteOfTheDay = anecdotes[votes.indexOf(Math.max(...votes))];

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdotes[selected]}</p>
			<p>Has {votes[selected]} votes</p>
			<Button text={"Vote"} onClick={voteUp} />
			<Button text={"Next"} onClick={randomice} />

			<h1>Anecdote with most votes</h1>
			<p>{anecdoteOfTheDay}</p>
		</div>
	);
};

export default App;
