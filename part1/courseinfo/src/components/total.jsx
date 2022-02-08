export const Total = (props) => {

	var total = 0;
	props.parts.map(function(element){
		return total += element.exercises
	})
	return (
		<div>
			<p>
				Number of exercises{" "} {total}
			</p>
		</div>
	);
};
