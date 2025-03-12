import { useState } from "react";

const TableCell = ({ langWord, word, parentId, handleChange, handleBlur, handleKeyDown }) => {
	const [isEdit, setIsEdit] = useState(false);

	const handleClickEdit = () => {
		setIsEdit(true);
	};

	return (
		<>
			{!isEdit ? (
				<td onDoubleClick={() => handleClickEdit(langWord, parentId)}>
					{word ? word : <i>No word</i>}
				</td>
			) : (
				<td>
					<input
						type="text"
						defaultValue={word}
						onChange={() => handleChange(event)}
						onBlur={() => {
							handleBlur(parentId, langWord, setIsEdit);
						}}
						onKeyDown={() => {
							handleKeyDown(parentId, langWord, event, setIsEdit);
						}}
					/>
				</td>
			)}
		</>
	);
};

export default TableCell;

