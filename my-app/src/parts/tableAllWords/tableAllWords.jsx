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
	const [isEditing, setIsEditing] = useState(false);
	//const [valueInput, setValueInput] = useState('');
	//const inputRef = useRef(null);

	const changeHandlerRadio = (event) => {
		setValueRadio(event.target.value);
	};

	const handleChange = (id, event, name) => {
		//setValueInput(event.target.value)
		console.log(id)
		console.log(event.target.value);
		console.log(name)
		let newValue = event.target.value;
		// let index = wordsState.findIndex((word) => word.id === id); // ищем его
		// 	if (index !== -1) {
		// 		setWordsState(
		// 			produce((draft) => {
		// 				draft[index].isEdit = true; // меняем в стейте значение isEdit: true
		// 			})
		// 		);
		// 	}
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

	const handleBlur = (id) => {
		console.log("Курсор покинул поле ввода!", id);

		handleChange(id,event);
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
										{word.eng ? word.eng : <i>No word</i>}
									</td>
								) : (
									<td>
										<input
											type="text"
											//name='eng'
											//value={word.eng}
											defaultValue={word.eng}
											onBlur={() => handleBlur(word.id)}
											onKeyDown={() => handleKeyDown(word.id)}
											onChange={() => handleChange(word.id, event)}
										/>
									</td>
								)}
								{!word.isEdit ? (
									<td onDoubleClick={() => handleClickDateTable(word.id)}>
										{word.rus ? word.rus : <i>No word</i>}
									</td>
								) : (
									<td>
										<input
											type="text"
											defaultValue={word.rus}
											onBlur={() => handleBlur(word.id)}
											onKeyDown={() => handleKeyDown(word.id)}
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
