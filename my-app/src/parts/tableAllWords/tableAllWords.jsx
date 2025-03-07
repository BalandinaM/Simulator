import styles from "./tableAllWords.module.css";
import { useLoaderData } from "react-router-dom";
import { getWords } from "../../forStorage";
import { useState } from "react";
import RadioButtonGroup from "../../components/radioButtonGroup/radioButtonGroup";
import { produce } from "immer";
import { findIndexById, startEditing, updateWordState, disablePreviousEditing } from "./handleTableActions";

export async function loader() {
	const words = await getWords();
	return { words };
}

const TableAllWords = () => {
	const { words } = useLoaderData();
	const [valueRadio, setValueRadio] = useState("all");
	const [wordsState, setWordsState] = useState(words);
	//console.log(wordsState);
	const [isEditing, setIsEditing] = useState(false);

	const changeHandlerRadio = (event) => {
		setValueRadio(event.target.value);
	};

	if (valueRadio === 'toLearn' ) {
		console.log('выучить!!!!')
	} else if (valueRadio === 'learned') {
		console.log('ЗНАЮ')
	} else if (valueRadio === 'all') {
		console.log('хочу видеть все')
	}

	const handleChange = (wordId, event) => {
		let newValue = event.target.value;
		return newValue;
	};

	const handleClickDateTable = (id) => {
		if (isEditing) {
			//отключаем редактирование предыдущего элемента
			disablePreviousEditing(wordsState, setWordsState);
			// Включаем редактирование для текущего элемента
			startEditing(id, setWordsState, wordsState, setIsEditing);
		} else {
			// Если редактирование не активно, включаем его для текущего элемента
			startEditing(id, setWordsState, wordsState, setIsEditing);
		}
	};

	const handleClickDelete = (id) => {
		let index = findIndexById(wordsState, id);
		if (index !== -1) {
			setWordsState(
				produce((draft) => {
					return draft.filter(elem => {
						return elem.id != id
					})
				})
			);
		}
	};

	const handleBlur = (wordId, parentId) => {
		if (isEditing) {
			disablePreviousEditing(wordsState, setWordsState);
		}
		let newValue = handleChange(wordId, event);
		let index = findIndexById(wordsState, parentId);
		if (index !== -1) {
			setWordsState(
				produce((draft) => {
					updateWordState(draft, index, wordId, newValue);
				})
			);
		}
	};

	const handleKeyDown = (wordId, parentId, event) => {
		if (event.key === "Enter") {
			console.log("Нажата клавиша Enter!", wordId, parentId);
			if (isEditing) {
				disablePreviousEditing(wordsState, setWordsState);
			}
			let newValue = handleChange(wordId, event);
			let index = findIndexById(wordsState, parentId);
			if (index !== -1) {
				setWordsState(
					produce((draft) => {
						updateWordState(draft, index, wordId, newValue);
					})
				);
			}
		}
	};

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
						wordsState.map((word) => (
							<tr key={word.id}>
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
						))
					) : (
						<tr>
							<td colSpan="2">
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
