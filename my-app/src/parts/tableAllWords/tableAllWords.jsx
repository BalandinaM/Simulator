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

	const handleClickEdit = (parentId, idItem, word) => {
		console.log(word)
		const index = findIndexById(wordsState, parentId);
		if (index !== -1) {
				setWordsState(
					produce((draft) => {
						const editElem = Object.values(draft[index]).find(
							(item) => item.idItem === idItem
						);
						editElem.isEdit = true;
					})
				);
			}
	}

	const handleChange = (event) => {
		let newValue = event.target.value;
		return newValue;
	};

	const handleBlur = (parentId, idItem) => {
		let newValue = handleChange(event);
		const index = findIndexById(wordsState, parentId);
		if (index !== -1) {
			setWordsState(
				produce((draft) => {
					const editElem = Object.values(draft[index]).find((item) => item.idItem === idItem);
					editElem.isEdit = false;
					editElem.text = newValue;
				})
			);
		}
	};

	const handleKeyDown = (parentId, idItem, event) => {
		if (event.key === "Enter") {
			let newValue = handleChange(event);
			const index = findIndexById(wordsState, parentId);
			if (index !== -1) {
				setWordsState(
					produce((draft) => {
						const editElem = Object.values(draft[index]).find((item) => item.idItem === idItem);
						editElem.isEdit = false;
						editElem.text = newValue;
					})
				);
			}
		}
	};

	const handleClickDelete = (parentId) => {
		let index = findIndexById(wordsState, parentId);
		if (index !== -1) {
			setWordsState(
				produce((draft) => {
					return draft.filter(elem => {
						return elem.id != parentId
					})
				})
			);
		}
	};

	const renderTableRow = (arr) => {
		return arr.map((word) => (
			<TableRow
				key={word.id}
				word={word}
				handleClickEdit={handleClickEdit}
				handleChange={handleChange}
				handleBlur={handleBlur}
				handleKeyDown={handleKeyDown}
				handleClickDelete={handleClickDelete}
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
