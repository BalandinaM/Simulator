import styles from './tableAllWords.module.css';
import { useLoaderData } from 'react-router-dom';
import { getWords } from '../../forStorage';
import { useState } from 'react';
import RadioButtonGroup from '../../components/radioButtonGroup/radioButtonGroup';

export async function loader() {
	const words = await getWords();
	return {words};
}

// Нужно реализовать страницу, на которой будет выводиться таблица всех слов. Нужно реализовать возможность редактирования и удаления слов.

// Нужно сделать переключатель, с помощью которого можно вывести либо все слова, либо слова, которые остались для заучивания, либо уже выученные слова.

const TableAllWords = () => {
	const { words } = useLoaderData();
	const [valueRadio, setValueRadio] = useState('all');
	const [isEdit, setIsEdit] = useState(false);

	function changeHandlerRadio(event) {
		setValueRadio(event.target.value);
	}

function handleClickDateTable(event) {
	console.log(event.target)
	setIsEdit(true);
}

function handleClickDelete(event) {
	console.log(event.target)
}

	return (
		<div className={styles.container}>
			<h2>Список слов</h2>
			<p>В таблицу выведены все ваши слова, вы можете вывести список уже выученных слов, а также список слов которые осталовь выучить</p>
			<p>Также здесь вы можете внести изменения в ваш словарик, отредактировать или удалить слова. </p>
			<RadioButtonGroup value={valueRadio} onChange={changeHandlerRadio} />
			<table>
				<thead>
					<tr>
						<th>Английское слово</th>
						<th>Перевод</th>
					</tr>
				</thead>
				<tbody>
					{words.length ? (
						words.map((word) => (
							<tr key={word.id}>
								{!isEdit ?
									(<td onClick={handleClickDateTable}>{word.eng ? word.eng : <i>No word</i>}</td>) :
									<input type='text' defaultValue={word.eng}/>
								}

								<td onClick={handleClickDateTable}>{word.rus ? word.rus : <i>No word</i>}</td>
								<td>{word.isLearn !== false ? <i>выучить</i> : <i>знаю</i>}</td>
								<td><button onClick={handleClickDelete}>Удалить</button></td>
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
{
	/* {words.length ? (
				<div>
					{words.map((word) => (
						<>
							<p>{word.eng ? word.eng : <i>No word</i>}</p>
							<p>{word.rus ? word.rus : <i>No word</i>}</p>
						</>
					))}
				</div>
			) : (
				<p><i>no word here... </i></p>
			)} */
}
