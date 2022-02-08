import { Part } from "./part";

export const Content = (props) => {
	return (
		<div>
			<Part part={props.part1} quantity={props.quantity1} />
            <Part part={props.part2} quantity={props.quantity2} />
            <Part part={props.part3} quantity={props.quantity3} />
		</div>
	);
};
