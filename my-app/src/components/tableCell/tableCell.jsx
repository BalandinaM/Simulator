import { useState } from "react";

const TableCell = ({
	langWord,
	word,
	parentId,
	handleChange,
	handleBlur,
	handleKeyDown,
}) => {
	const [isEdit, setIsEdit] = useState();

	const handleClickEdit = (langWord, parentId) => {
		setIsEdit(true);
		console.log(langWord, parentId)
		// const index = findIndexById(wordsState, parentId);
		// if (index !== -1) {
		// 		setWordsState(
		// 			produce((draft) => {
		// 				const editElem = Object.values(draft[index]).find(
		// 					(item) => item.idItem === idItem
		// 				);
		// 				editElem.isEdit = true;
		// 			})
		// 		);
		// 	}
	}

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
							//setIsEdit(false);
							handleBlur(parentId, langWord, setIsEdit)}
						}
						onKeyDown={() => {
							handleKeyDown(parentId, langWord, event, setIsEdit)
							//setIsEdit(false)
							}
						}
					/>
				</td>
			)}
		</>
	);
};

export default TableCell;

// [
// 	{
// 		id: ...
// 		word:
// 		tran:
// 	}

// ]

// word tran

// obj[type] = text
