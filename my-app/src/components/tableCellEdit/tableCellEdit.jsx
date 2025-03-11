const TableCellEdit = ({word}) => {
	return (
		<td>
			<input type="text" defaultValue={word.text} />
		</td>
		// <td>
		// 			<input
		// 				type="text"
		// 				defaultValue={word.engWord.eng}
		// 				onBlur={() => handleBlur(word.engWord.idEng, word.id)}
		// 				onKeyDown={() => handleKeyDown(word.engWord.idEng, word.id, event)}
		// 				onChange={() => handleChange(word.engWord.idEng, event)}
		// 			/>
		// </td>
	)
}

export default TableCellEdit;
