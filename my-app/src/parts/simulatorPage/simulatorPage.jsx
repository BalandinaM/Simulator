//import { NavLink } from 'react-router-dom';
import styles from './simulatorPage.module.css';
import { useLoaderData } from 'react-router-dom';
import { getWords, setWords } from "../../forStorage";
import { useState } from "react";
import TranslationDirectionSwitcher from '../../components/translationDirectionSwitcher/translationDirectionSwitcher';
import { findIndexById } from '../tableAllWords/handleTableActions';
import { produce } from "immer";

export async function loader() {
	const wordsArray = await getWords();
	return {wordsArray};
}

const SimulatorPage = () => {
	const { wordsArray } = useLoaderData();
	const [wordsState, setWordsState] = useState(wordsArray);
	const [transIntoRu, setTransIntoRu] = useState(true);
	const [currentPairOfWords, setCurrentPairOfWords] = useState(null);
	const [inputValue, setInputValue] = useState('');
	const isDisabled = currentPairOfWords === null;//состояние для инпута и кнопки пока тренажер не в работе
	const [isError, setIsError] = useState(false);
	const [counterDisplayedWords, setCounterDisplayedWords] = useState(0)

	const getRandomPair = (array) => {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	};

	const toggleLearnStatus = (id, boolean) => {//меняет статус слова
		const index = findIndexById(wordsState, id);
		if (index != -1) {
			setWordsState(
				produce((draft) => {
					draft[index].isLearn = boolean;
				})
			)
		}
		//console.log(wordsState[index].isLearn);
		//await setWords(wordsState)
	}

	const startTraining = () => {//начать тренажер
		console.log(wordsArray)
		if (wordsArray.length > 0) {
			setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false)));
		}
	}

	//для реализации вывода выученных слов сделать счетчик и запускать разные фильтры в зависиомости от значения стестчика

// например на каждые пять слов которые надо выучить выдаем одно слово которое уже знаем
	//для того чтобы отметить что слово выучено, надо менять стейт,нужно добавить функцию которая будет этим заниматься
	// если стейт менять на лету, тормозит надо сделать что бы полностью обновленный стейт отправлялся один раз


	//Тренажер должен запоминать слова, на которые пользователь уже дал правильный ответ и
	// !!!!!!!!!!!!!!!при следующем запуске уже не задавать эти слова.!!!!!!!!!!!!!!!!

	///Необходимо предусмотреть кнопку сброса, нажатие на которую будет приводить к очистке сохраненных ответов.

	const handleInputChange = (event) => {//обработка ввода в инпут
		setInputValue(event.target.value);
	}

	//let counterDisplayedWords = 0;
	//console.log(counterDisplayedWords);

	const handleCheckButtonClick = () => {//кнопка проверки введенного значения
		setCounterDisplayedWords(counterDisplayedWords + 1);
		console.log(counterDisplayedWords);
		if (transIntoRu) {
			if (inputValue.trim().toLowerCase() === currentPairOfWords.russian) {
				console.log(currentPairOfWords.isLearn);
				//console.log(wordsState);
				if (isError) {//если до этого была ошибка, а следом введено правильное значение
					setIsError(false);//убираем ошибку
					setInputValue('');//сборос инпута
					if (counterDisplayedWords > 5) {
						setCounterDisplayedWords(0)
						setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === true)));
					} else {
						setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false)));//новая пара слов
					}
				} else {//если ошибки не было
					setInputValue('');
					if (counterDisplayedWords > 5) {
						setCounterDisplayedWords(0)
						setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === true)));
					} else {
						setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false)));//новая пара слов
						toggleLearnStatus(currentPairOfWords.id, true);//меняем статус isLearn
					}
				}
			} else {
				console.log("ошибка!");
				setIsError(true);
				toggleLearnStatus(currentPairOfWords.id, false);//меняем статус isLearn
			}
		} else {
			if (inputValue.trim().toLowerCase() === currentPairOfWords.english) {
				//console.log("верно");
				console.log(wordsState);
				if (isError) {//если до этого была ошибка, а следом введено правильное значение
					setIsError(false);//убираем ошибку
					setInputValue('');//сборос инпута
					setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false)));//новая пара слов
				} else {//если ошибки не было
					setInputValue('');
					setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false)));
					toggleLearnStatus(currentPairOfWords.id, true);//меняем статус isLearn
				}
			} else {
				console.log("ошибка!");
				setIsError(true);
				toggleLearnStatus(currentPairOfWords.id, false);//меняем статус isLearn
			}
		}
	};

	async function saveProgress() {
		await setWords(wordsState);
		console.log('изменения отправлены')
	}

	async function resetProgress() {
		if (window.confirm('Вы уверены, что хотите сбросить прогресс? Это действие необратимо — все данные будут удалены без возможности восстановления.')) {
     setWordsState(
			produce((draft) => {
				draft.forEach((elem) => {
					elem.isLearn = false;
				})
			})
		)
		await setWords(wordsState);
		console.log('прогресс обнулен')
    }
	}


	return (
		<div className={styles.container}>
			<TranslationDirectionSwitcher transIntoRu={transIntoRu} setTransIntoRu={setTransIntoRu} />
			<div className={styles.wrap_word}>
				{currentPairOfWords ? (
					transIntoRu ? (
						<p>{currentPairOfWords.english}</p>
					) : (
						<p>{currentPairOfWords.russian}</p>
					)
				) : (
					<button onClick={startTraining}>Начать</button>//подумать над названием кнопки
				)}
			</div>
			<div className={styles.wrap_input}>
				<input className={`${styles.input} ${isError ? styles.input_error : ''}`}type="text" onChange={handleInputChange} disabled={isDisabled} value={inputValue}/>
				<button onClick={handleCheckButtonClick} disabled={isDisabled}>Проверить</button>
			</div>
			<button onClick={saveProgress}>Сохранить прогресс</button>
			<button onClick={resetProgress}>Сбросить весь прогресс</button>
		</div>
	);
};

export default SimulatorPage;
