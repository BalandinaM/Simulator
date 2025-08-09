import { useState } from "react";

const Textarea = () => {
	const [value, setValue] = useState("");

	return (
		<>
			<textarea
				name="newWords"
				id="newWords"
				value = {value}
				onChange={event => setValue(event.target.value)}
				placeholder="apple яблоко"
				rows="15"
				cols="50"
			/>
			<p>{value}</p>
		</>
	);
};

export default Textarea;
