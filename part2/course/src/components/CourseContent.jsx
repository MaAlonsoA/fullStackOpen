import React from "react";

export const CourseContent = ({ name, exercises }) => {
	return (
		<p>
			{name}: {exercises}
		</p>
	);
};
