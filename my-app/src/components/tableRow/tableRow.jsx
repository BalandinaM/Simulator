import TableCell from "../tableCell/tableCell";
//import TableCellEdit from "../tableCellEdit/tableCellEdit";

const TableRow = ({id, word, handleClickEdit}) => {
	return (
		<tr key={id}>
			<TableCell word={word.word} handleClickEdit={handleClickEdit} parentId={word.id}/>
			<TableCell word={word.trans} handleClickEdit={handleClickEdit} parentId={word.id}/>
			<td>{word.isLearn === false ? <i>выучить</i> : <i>знаю</i>}</td>
			<td>
				{/* <button onClick={() => handleClickDelete(word.id)}>Удалить</button> */}
				<button >Удалить</button>
			</td>
		</tr>
	);
};

export default TableRow;
