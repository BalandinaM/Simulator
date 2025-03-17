//import { NavLink } from 'react-router-dom';
import styles from "./simulatorPage.module.css";
import { useLoaderData } from "react-router-dom";
import { getWords, setWords } from "../../forStorage";
import { useState, useRef } from "react";
import TranslationDirectionSwitcher from "../../components/translationDirectionSwitcher/translationDirectionSwitcher";
import { findIndexById } from "../tableAllWords/handleTableActions";
import { produce } from "immer";

export async function loader() {
	const wordsArray = await getWords();
	return { wordsArray };
}

const SimulatorPage = () => {
	const { wordsArray } = useLoaderData();
	const draftWordsStateRef = useRef(wordsArray)
	//const [wordsState, setWordsState] = useState(wordsArray);
	const [transIntoRu, setTransIntoRu] = useState(true);
	const [currentPairOfWords, setCurrentPairOfWords] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const isDisabled = currentPairOfWords === null; //состояние для инпута и кнопки пока тренажер не в работе
	const [isError, setIsError] = useState(false);
	const [counterDisplayedWords, setCounterDisplayedWords] = useState(0);

	const getRandomPair = (array) => {
		const randomIndex = Math.floor(Math.random() * array.length);
		return array[randomIndex];
	};

	const toggleLearnStatus = (id, boolean) => {
		//меняет статус слова
		const index = findIndexById(draftWordsStateRef.current, id);
		if (index != -1) {
			draftWordsStateRef.current = produce(draftWordsStateRef.current, (draft) => {
					draft[index].isLearn = boolean;
				})
		}
	};

	const startTraining = () => {
		//начать тренажер
		console.log(wordsArray);
		if (wordsArray.length > 0) {
			setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false)));
		}
	};

	const handleInputChange = (event) => {
		//обработка ввода в инпут
		setInputValue(event.target.value);
	};

	//let counterDisplayedWords = 0;
	//console.log(counterDisplayedWords);

	const handleCheckButtonClick = () => {
		//кнопка проверки введенного значения
		setCounterDisplayedWords(counterDisplayedWords + 1);
		console.log(counterDisplayedWords);
		if (transIntoRu) {
			if (inputValue.trim().toLowerCase() === currentPairOfWords.russian) {
				console.log(currentPairOfWords.isLearn);
				//console.log(wordsState);
				if (isError) {
					//если до этого была ошибка, а следом введено правильное значение
					setIsError(false); //убираем ошибку
					setInputValue(""); //сборос инпута
					if (counterDisplayedWords > 5) {
						setCounterDisplayedWords(0);
						setCurrentPairOfWords(
							getRandomPair(wordsArray.filter((item) => item.isLearn === true))
						);
					} else {
						setCurrentPairOfWords(
							getRandomPair(wordsArray.filter((item) => item.isLearn === false))
						); //новая пара слов
					}
				} else {
					//если ошибки не было
					setInputValue("");
					if (counterDisplayedWords > 5) {
						setCounterDisplayedWords(0);
						setCurrentPairOfWords(
							getRandomPair(wordsArray.filter((item) => item.isLearn === true))
						);
					} else {
						setCurrentPairOfWords(
							getRandomPair(wordsArray.filter((item) => item.isLearn === false))
						); //новая пара слов
						toggleLearnStatus(currentPairOfWords.id, true); //меняем статус isLearn
					}
				}
			} else {
				console.log("ошибка!");
				setIsError(true);
				toggleLearnStatus(currentPairOfWords.id, false); //меняем статус isLearn
			}
		} else {
			if (inputValue.trim().toLowerCase() === currentPairOfWords.english) {
				//console.log("верно");
				if (isError) {
					//если до этого была ошибка, а следом введено правильное значение
					setIsError(false); //убираем ошибку
					setInputValue(""); //сборос инпута
					setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false))); //новая пара слов
				} else {
					//если ошибки не было
					setInputValue("");
					setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false)));
					toggleLearnStatus(currentPairOfWords.id, true); //меняем статус isLearn
				}
			} else {
				console.log("ошибка!");
				setIsError(true);
				toggleLearnStatus(currentPairOfWords.id, false); //меняем статус isLearn
			}
		}
	};

	async function saveProgress() {
		await setWords(draftWordsStateRef.current);
		console.log("изменения отправлены");
	}


	//возможно эту функцию стоит перенести в список слов
	async function resetProgress() {
		if (
			window.confirm(
				"Вы уверены, что хотите сбросить прогресс? Это действие необратимо — все данные будут удалены без возможности восстановления."
			)
		) {
			draftWordsStateRef.current = produce(draftWordsStateRef.current, (draft) => {
				draft.forEach((elem) => {
					elem.isLearn = false;
				})
			})
			await setWords(draftWordsStateRef.current);
			console.log("прогресс обнулен");
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
					<button onClick={startTraining}>Начать</button> //подумать над названием кнопки
				)}
			</div>
			<div className={styles.wrap_input}>
				<input
					className={`${styles.input} ${isError ? styles.input_error : ""}`}
					type="text"
					onChange={handleInputChange}
					disabled={isDisabled}
					value={inputValue}
				/>
				<button onClick={handleCheckButtonClick} disabled={isDisabled}>
					Проверить
				</button>
			</div>
			<button onClick={saveProgress}>Сохранить прогресс</button>
			<button onClick={resetProgress}>Сбросить весь прогресс</button>
		</div>
	);
};

export default SimulatorPage;
