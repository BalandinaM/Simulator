import TableCell from "../tableCell/tableCell";

const TableRow = ({
	id,
	wordEnglish,
	wordRussian,
	isLearn,
	parentId,
	handleChange,
	handleBlur,
	handleKeyDown,
	handleClickDelete,
}) => {
	return (
		<tr key={id}>
			<TableCell
				langWord='english'
				word={wordEnglish}
				parentId={parentId}
				handleChange={handleChange}
				handleBlur={handleBlur}
				handleKeyDown={handleKeyDown}
			/>
			<TableCell
				langWord='russian'
				word={wordRussian}
				parentId={parentId}
				handleChange={handleChange}
				handleBlur={handleBlur}
				handleKeyDown={handleKeyDown}
			/>
			<td>{isLearn === false ? <i>выучить</i> : <i>знаю</i>}</td>
			<td>
				<button onClick={() => handleClickDelete(parentId)}>Удалить</button>
			</td>
		</tr>
	);
};

export default TableRow;
