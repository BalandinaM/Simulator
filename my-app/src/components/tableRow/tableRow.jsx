import TableCell from "../tableCell/tableCell";
import TrashIcon from "../trashIcon/trashIcon";
import styles from './tableRow.module.css';

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
			<td className={styles.cell}>{isLearn === false ? <i>в процессе</i> : <i>знаю</i>}</td>
			<td className={styles.cell_forButton}>
				<button onClick={() => handleClickDelete(parentId)}><TrashIcon/></button>
			</td>
		</tr>
	);
};

export default TableRow;
