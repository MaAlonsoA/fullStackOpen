import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./components/header";
import { Total } from "./components/total";
import { Content } from "./components/content";

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
		  {
			name: 'Fundamentals of React',
			exercises: 10
		  },
		  {
			name: 'Using props to pass data',
			exercises: 7
		  },
		  {
			name: 'State of a component',
			exercises: 14
		  }
		]
	  }

	return (
		<>
			<Header courseName={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
