import { useState, useEffect, useRef } from "react";
import styles from "./tableCell.module.css";

const TableCell = ({
	langWord,
	word,
	parentId,
	handleChange,
	handleKeyDown,
}) => {
	const [isEdit, setIsEdit] = useState(false);
	const inputRef = useRef(null); // Создаем реф для input

  // Устанавливаем фокус при изменении isEdit
  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

	const handleClickEdit = () => {
		setIsEdit(true);
	};

	return (
		<>
			{!isEdit ? (
				<td
					onDoubleClick={() => handleClickEdit(langWord, parentId)}
					className={styles.cellForWord}
				>
					{word ? word : <i>No word</i>}
				</td>
			) : (
				<td>
					<input
						ref={inputRef}
						className={styles.input}
						type="text"
						defaultValue={word}
						onChange={() => handleChange(event)}
						onBlur={() => setIsEdit(false)}
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
