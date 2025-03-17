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
	const draftWordsStateRef = useRef(wordsArray);
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

	//меняет статус слова в памяти приложения
	const toggleLearnStatus = (id, boolean) => {
		const index = findIndexById(draftWordsStateRef.current, id);
		if (index != -1) {
			draftWordsStateRef.current = produce(draftWordsStateRef.current, (draft) => {
				draft[index].isLearn = boolean;
			});
		}
	};

	//начать тренажер
	const startTraining = () => {
		if (wordsArray.length > 0) {
			setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false)));
		}
	};

	//обработка ввода в инпут
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	//обработка правильного ответа
	const handleCorrectAnswer = () => {
		setIsError(false);
		setInputValue("");
		const learnedWords = wordsArray.filter((item) => item.isLearn === true);

		if (learnedWords.length === 0 || counterDisplayedWords <= 5) {
			setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false)));
			toggleLearnStatus(currentPairOfWords.id, true);
		} else {
			setCounterDisplayedWords(0);
			setCurrentPairOfWords(getRandomPair(learnedWords));
		}
	};

	//обработка неправильного ответа
	const handleIncorrectAnswer = () => {
		console.log("ошибка!");
		setIsError(true);
		toggleLearnStatus(currentPairOfWords.id, false);
	};

	//
	const handleCheckButtonClick = () => {
		setCounterDisplayedWords(counterDisplayedWords + 1);

		const isCorrect = transIntoRu
			? inputValue.trim().toLowerCase() === currentPairOfWords.russian
			: inputValue.trim().toLowerCase() === currentPairOfWords.english;

		if (isCorrect) {
			handleCorrectAnswer();
		} else {
			handleIncorrectAnswer();
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
				});
			});
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
