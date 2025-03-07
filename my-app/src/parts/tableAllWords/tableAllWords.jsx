import styles from './tableAllWords.module.css';
import { useLoaderData } from 'react-router-dom';
import { getWords } from '../../forStorage';
import { useState, useRef } from 'react';
import RadioButtonGroup from '../../components/radioButtonGroup/radioButtonGroup';
import { produce } from "immer";

export async function loader() {
	const words = await getWords();
	return {words};
}

// Нужно реализовать страницу, на которой будет выводиться таблица всех слов. Нужно реализовать возможность редактирования и удаления слов.

// Нужно сделать переключатель, с помощью которого можно вывести либо все слова, либо слова, которые остались для заучивания, либо уже выученные слова.

const TableAllWords = () => {
	const { words } = useLoaderData();
	const [valueRadio, setValueRadio] = useState("all");
	const [wordsState, setWordsState] = useState(words);
	//console.log(wordsState);
	const [isEditing, setIsEditing] = useState(false);

	const changeHandlerRadio = (event) => {
		setValueRadio(event.target.value);
	};

	const handleChange = (wordId, event) => {
		console.log(wordId)
		let newValue = event.target.value;
		return newValue;
	}

	const handleClickDateTable = (id) => {// обработка двойного клика по яйчейке таблицы
		if (isEditing) {// если состояние isEditing
			console.log("editing....");
			let indexPrevEdit = wordsState.findIndex((word) => word.isEdit === true); //ищем элемент с isEdit: true
			if (indexPrevEdit !== -1) {
				setWordsState(
					produce((draft) => {
						draft[indexPrevEdit].isEdit = false; //меняем на false
					})
				);
			}
			setIsEditing(true); // снова устанавливаем isEditing уже для текущего элемента
			let index = wordsState.findIndex((word) => word.id === id); // ищем его
			if (index !== -1) {
				setWordsState(
					produce((draft) => {
						draft[index].isEdit = true; // меняем в стейте значение isEdit: true
					})
				);
			}
		} else {// если в данный момент ни какие поля не редактируются
			setIsEditing(true);
			let index = wordsState.findIndex((word) => word.id === id);
			if (index !== -1) {
				setWordsState(
					produce((draft) => {
						draft[index].isEdit = true;
					})
				);
			}
		}
	};  // эта куча кода написана для того чтобы избежать ситуации в которй юзер кликнул по полю, но ни чего в нем не сделал(курсор там не побывал), соответсвенно события onBlur или Enter, уже не сработают



	const handleClickDelete = (event) => {
		console.log(event.target);
	};

	const handleBlur = (wordId, parentId) => {
		console.log("Курсор покинул поле ввода!", wordId);
		console.log('родительский ид', parentId)

		let newValue = handleChange(wordId,event);
		let index = wordsState.findIndex((word) => word.id === parentId);
			if (index !== -1) {
				setWordsState(
					produce((draft) => {
						let changeElem = Object.values(draft[index]).find(
							(item) => item.idEng === wordId || item.idRus === wordId
						);
						if (changeElem.eng) {
							changeElem.eng = newValue;
						} else {
							changeElem.rus = newValue;
						}
					})
				);
			}
	};

	const handleKeyDown = (event, id) => {
		if (event.key === "Enter") {
			console.log("Нажата клавиша Enter!", id);
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
											onKeyDown={() => handleKeyDown(word.engWord.idEng, word.id)}
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
											onKeyDown={() => handleKeyDown(word.rusWord.idRus, word.id)}
											onChange={() => handleChange(word.rusWord.idRus, event)}
										/>
									</td>
								)}

								<td>{word.isLearn === false ? <i>выучить</i> : <i>знаю</i>}</td>
								<td>
									<button onClick={handleClickDelete}>Удалить</button>
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
