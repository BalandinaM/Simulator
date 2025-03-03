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

	function changeHandlerRadio(event) {
		setValueRadio(event.target.value);
	}

	return (
		<div className={styles.container}>
			<RadioButtonGroup value={valueRadio} onChange={changeHandlerRadio} />
			<h3>table</h3>
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
								<td>{word.eng ? word.eng : <i>No word</i>}</td>
								<td>{word.rus ? word.rus : <i>No word</i>}</td>
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
