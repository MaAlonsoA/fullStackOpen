import React from "react";
import { CourseHeader } from "./CourseHeader";
import { CourseContent } from "./CourseContent";

export const Course = ({ name, parts }) => {
	const total = parts.reduce((acc, current) => {
		return (acc += current.exercises);
	}, 0);

	return (
		<div>
			<CourseHeader header={name} />
			{parts.map((element) => {
				return (
					<CourseContent
						key={element.id}
						name={element.name}
						exercises={element.exercises}
					/>
				);
			})}
			<p>
				Total of <strong>{total}</strong> exercises
			</p>
		</div>
	);
};
