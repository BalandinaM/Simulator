const TableCell = ({word, handleClickEdit, parentId}) => {

	return (
		<>
			{!word.isEdit ? (
				<td onDoubleClick={() => handleClickEdit(event, word.isEdit, parentId)}>{word.text ? word.text : <i>No word</i>}</td>
			) : (
				<td>
				<input type="text" defaultValue={word.text} />
			</td>
			)}

			{/* // <td onDoubleClick={() => handleClickDateTable(word.id)}>
			// 			{word.engWord.eng ? word.engWord.eng : <i>No word</i>}
			// </td> */}
		</>
	)
}

export default TableCell;
