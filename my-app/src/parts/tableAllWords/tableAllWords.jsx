import styles from "./tableAllWords.module.css";
import { useLoaderData } from "react-router-dom";
import { getWords, setWords } from "../../forStorage";
import { useState } from "react";
import RadioButtonGroup from "../../components/radioButtonGroup/radioButtonGroup";
import { produce } from "immer";
import { findIndexById } from "./handleTableActions";
import TableRow from "../../components/tableRow/tableRow";

export async function loader() {
	const wordsArray = await getWords();
	return { wordsArray };
}

// подумать над валидацией инпутов

const TableAllWords = () => {
	const { wordsArray } = useLoaderData();
	const [valueRadio, setValueRadio] = useState("all");
	const [wordsState, setWordsState] = useState(wordsArray);
	//console.log(wordsState);

	const changeHandlerRadio = (event) => {
		setValueRadio(event.target.value);
	};

	const filterWordsState = (wordsState, valueRadio) => {
		if (valueRadio === "toLearn") {
			return wordsState.filter((wordItem) => !wordItem.isLearn);
		} else if (valueRadio === "learned") {
			return wordsState.filter((wordItem) => wordItem.isLearn);
		} else if (valueRadio === "all") {
			return wordsState;
		}
	};

	const handleChange = (event) => {
		let newValue = event.target.value;
		console.log(newValue)
		return newValue;
	};

	const handleBlur = async (parentId, langWord, setIsEdit) => {
		setIsEdit(false);
		let newValue = handleChange(event);
		const index = findIndexById(wordsState, parentId);
		if (index !== -1) {
			setWordsState(
				produce((draft) => {
					draft[index][langWord] = newValue;
				})
			);
		}
		await setWords(wordsState);
	};

	const handleKeyDown = async (parentId, langWord, event, setIsEdit) => {
		if (event.key === "Enter") {
			setIsEdit(false);
			let newValue = handleChange(event);
			const index = findIndexById(wordsState, parentId);
			if (index !== -1) {
				setWordsState(
					produce((draft) => {
						draft[index][langWord] = newValue;
					})
				);
			}
		}
		await setWords(wordsState);
	};

	const handleClickDelete = async (parentId) => {
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
		await setWords(wordsState);
	};

	const renderTableRow = (arr) => {
		return arr.map((item) => (
			<TableRow
				key={item.id}
				parentId={item.id}
				wordEnglish={item.english}
				wordRussian={item.russian}
				isLearn={item.isLearn}
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
