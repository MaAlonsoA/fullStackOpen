import { Part } from "./part";

export const Content = (props) => {
	return (
		<div>
			{props.parts.map(function (element, i = 0) {
				return (
					<Part part={element.name} quantity={element.exercises} key={i++} />
				);
			})}
		</div>
	);
};
