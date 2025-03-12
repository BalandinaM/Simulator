const TableCell = ({
	word,
	handleClickEdit,
	parentId,
	handleChange,
	handleBlur,
	handleKeyDown,
}) => {
	return (
		<>
			{!word.isEdit ? (
				<td onDoubleClick={() => handleClickEdit(parentId, word.idItem, word)}>
					{word.text ? word.text : <i>No word</i>}
				</td>
			) : (
				<td>
					<input
						type="text"
						defaultValue={word.text}
						onChange={() => handleChange(event)}
						onBlur={() => handleBlur(parentId, word.idItem)}
						onKeyDown={() => handleKeyDown(parentId, word.idItem, event)}
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
