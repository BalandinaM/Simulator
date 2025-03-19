import { useState } from "react";
import styles from './tableCell.module.css';

const TableCell = ({ langWord, word, parentId, handleChange, handleBlur, handleKeyDown }) => {
	const [isEdit, setIsEdit] = useState(false);

	const handleClickEdit = () => {
		setIsEdit(true);
	};

	return (
		<>
			{!isEdit ? (
				<td onDoubleClick={() => handleClickEdit(langWord, parentId)} className={styles.cellForWord}>
					{word ? word : <i>No word</i>}
				</td>
			) : (
				<td>
					<input
						className={styles.input}
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

