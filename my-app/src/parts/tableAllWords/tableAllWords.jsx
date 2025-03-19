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
		console.log(newValue);
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

	async function handleClickDelete(parentId) {
		let index = findIndexById(wordsState, parentId);

		if (index !== -1) {
			const updatedWordsState = produce(wordsState, (draft) => {
				return draft.filter((elem) => elem.id !== parentId);
			});
			setWordsState(updatedWordsState);
			await setWords(updatedWordsState);

			console.log(updatedWordsState);
			console.log("элемент удален!");
		}
	}

	async function resetProgress() {
		if (window.confirm("Вы уверены, что хотите сбросить прогресс? Это действие необратимо.")) {
			const updatedWordsState = produce(wordsState, (draft) => {
				draft.forEach((elem) => {
					elem.isLearn = false;
				});
			});
			setWordsState(updatedWordsState);
			await setWords(updatedWordsState);
		}
	}

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
		));
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.visually_hidden}>Список слов</h2>
			{/* <p>
				В таблицу выведены все ваши слова, вы можете вывести список уже выученных слов, а также
				список слов которые осталось выучить.
			</p> */}
			<p>
				Здесь вы можете внести изменения в ваш словарик, отредактировать или удалить слова. <br/> Для редактирования слова необходимо два раза кликнуть левой кнопкой мыши по слову. <br/> Для сохранения внесенных изменений нажать клавишу Enter или кликнуть мышью в любом месте экрана. <br/> А также сбросить прогресс и начать обучение заново.
			</p>
			<RadioButtonGroup value={valueRadio} onChange={changeHandlerRadio} />
			<table className={styles.table}>
				<thead>
					<tr className={styles.trHead}>
						<th>Английское слово</th>
						<th>Перевод</th>
						<th>Статус</th>
						<th></th>
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
			<button onClick={resetProgress}>Сбросить прогресс</button>
		</div>
	);
};

export default TableAllWords;
