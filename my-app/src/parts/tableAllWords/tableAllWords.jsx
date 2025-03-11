import styles from "./tableAllWords.module.css";
import { useLoaderData } from "react-router-dom";
import { getWords } from "../../forStorage";
import { useState } from "react";
import RadioButtonGroup from "../../components/radioButtonGroup/radioButtonGroup";
import { produce } from "immer";
import { findIndexById, startEditing, updateWordState, disablePreviousEditing } from "./handleTableActions";
import TableRow from "../../components/tableRow/tableRow";

export async function loader() {
	const words = await getWords();
	return { words };
}

const TableAllWords = () => {
	const { words } = useLoaderData();
	const [valueRadio, setValueRadio] = useState("all");
	const [wordsState, setWordsState] = useState(words);
	//console.log(wordsState);

	const changeHandlerRadio = (event) => {
		setValueRadio(event.target.value);
	};

	const filterWordsState = (wordsState, valueRadio) => {
		if (valueRadio === "toLearn") {
			return wordsState.filter((word) => !word.isLearn);
		} else if (valueRadio === "learned") {
			return wordsState.filter((word) => word.isLearn);
		} else if (valueRadio === "all") {
			return wordsState;
		}
	};

	const handleClickEdit = (event, isEdit, parentId) => {
		console.log(event.target)
		console.log(isEdit);
		console.log(parentId);
		isEdit = true;
		console.log(isEdit);
	}

	const renderTableRow = (arr) => {
		return arr.map((word) => (
			<TableRow
				key={word.id}
				word={word}
				handleClickEdit={handleClickEdit}
				// handleClickDateTable={handleClickDateTable}
				// handleBlur={handleBlur}
				// handleKeyDown={handleKeyDown}
				// handleChange={handleChange}
				// handleClickDelete={handleClickDelete}
			/>
		))
	}

	return (
		<div className={styles.container}>
			<h2>Список слов</h2>
			<p>
				В таблицу выведены все ваши слова, вы можете вывести список уже выученных слов, а также
				список слов которые осталовь выучить
			</p>
			<p>
				Также здесь вы можете внести изменения в ваш словарик, отредактировать или удалить слова.{" "}
			</p>
			<RadioButtonGroup value={valueRadio} onChange={changeHandlerRadio} />
			<table>
				<thead>
					<tr>
						<th>Английское слово</th>
						<th>Перевод</th>
					</tr>
				</thead>
				<tbody>
					{wordsState.length ? (
						renderTableRow(filterWordsState(wordsState, valueRadio))
					) : (
						<tr>
							<td colSpan="4">
								<i>no word here...</i>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TableAllWords;
