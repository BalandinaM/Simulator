const TableRow = ({
	id,
	word,
	handleClickDateTable,
	handleBlur,
	handleKeyDown,
	handleChange,
	handleClickDelete,
}) => {
	return (
		<tr key={id}>
			{!word.isEdit ? (
				<td onDoubleClick={() => handleClickDateTable(word.id)}>
					{word.engWord.eng ? word.engWord.eng : <i>No word</i>}
				</td>
			) : (
				<td>
					<input
						type="text"
						defaultValue={word.engWord.eng}
						onBlur={() => handleBlur(word.engWord.idEng, word.id)}
						onKeyDown={() => handleKeyDown(word.engWord.idEng, word.id, event)}
						onChange={() => handleChange(word.engWord.idEng, event)}
					/>
				</td>
			)}
			{!word.isEdit ? (
				<td onDoubleClick={() => handleClickDateTable(word.id)}>
					{word.rusWord.rus ? word.rusWord.rus : <i>No word</i>}
				</td>
			) : (
				<td>
					<input
						type="text"
						defaultValue={word.rusWord.rus}
						onBlur={() => handleBlur(word.rusWord.idRus, word.id)}
						onKeyDown={() => handleKeyDown(word.rusWord.idRus, word.id, event)}
						onChange={() => handleChange(word.rusWord.idRus, event)}
					/>
				</td>
			)}

			<td>{word.isLearn === false ? <i>выучить</i> : <i>знаю</i>}</td>
			<td>
				<button onClick={() => handleClickDelete(word.id)}>Удалить</button>
			</td>
		</tr>
	);
};

export default TableRow;
