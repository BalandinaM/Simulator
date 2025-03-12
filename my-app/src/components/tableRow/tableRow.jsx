import TableCell from "../tableCell/tableCell";

const TableRow = ({
	id,
	word,
	handleClickEdit,
	handleChange,
	handleBlur,
	handleKeyDown,
	handleClickDelete,
}) => {
	return (
		<tr key={id}>
			<TableCell
				word={word.word}
				handleClickEdit={handleClickEdit}
				parentId={word.id}
				handleChange={handleChange}
				handleBlur={handleBlur}
				handleKeyDown={handleKeyDown}
			/>
			<TableCell
				word={word.trans}
				handleClickEdit={handleClickEdit}
				parentId={word.id}
				handleChange={handleChange}
				handleBlur={handleBlur}
				handleKeyDown={handleKeyDown}
			/>
			<td>{word.isLearn === false ? <i>выучить</i> : <i>знаю</i>}</td>
			<td>
				<button onClick={() => handleClickDelete(word.id)}>Удалить</button>
			</td>
		</tr>
	);
};

export default TableRow;
