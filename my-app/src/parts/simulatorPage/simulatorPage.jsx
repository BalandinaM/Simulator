//import { NavLink } from 'react-router-dom';
import styles from "./simulatorPage.module.css";
import { useLoaderData } from "react-router-dom";
import { getWords, setWords } from "../../forStorage";
import { useState, useRef, useEffect } from "react";
import TranslationDirectionSwitcher from "../../components/translationDirectionSwitcher/translationDirectionSwitcher";
import { findIndexById } from "../tableAllWords/handleTableActions";
import { produce } from "immer";
import ModalBox from "../../components/modalBox/modalBox";
import { NavLink } from 'react-router-dom';

export async function loader() {
	const wordsArray = await getWords();
	return { wordsArray };
}

const SimulatorPage = () => {
	//const { wordsArray } = useLoaderData();
	const { wordsArray: initialWordsArray } = useLoaderData();
	const [wordsArray, setWordsArray] = useState(initialWordsArray);
	const draftWordsStateRef = useRef(wordsArray);
	const [transIntoRu, setTransIntoRu] = useState(true);
	const [currentPairOfWords, setCurrentPairOfWords] = useState(null);
	const [inputValue, setInputValue] = useState("");
	const isDisabled = currentPairOfWords === null; //состояние для инпута и кнопки пока тренажер не в работе
	const [isError, setIsError] = useState(false);
	const [counterDisplayedWords, setCounterDisplayedWords] = useState(0);
	const [showModalSave, setShowModalSave] = useState(false);
	const hasWords = currentPairOfWords === undefined;
	console.log(wordsArray);
	console.log(hasWords);
	console.log(currentPairOfWords);

	useEffect(() => {
		if (showModalSave) {
			setWordsArray(draftWordsStateRef.current);
		}
	}, [showModalSave]);

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
		setShowModalSave(false);
		if (wordsArray.length > 0) {
			setCurrentPairOfWords(getRandomPair(wordsArray.filter((item) => item.isLearn === false)));
			console.log(currentPairOfWords)
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

	const handleKeyDown = () => {
		if (event.key === "Enter") {
			setCounterDisplayedWords(counterDisplayedWords + 1);

			const isCorrect = transIntoRu
				? inputValue.trim().toLowerCase() === currentPairOfWords.russian
				: inputValue.trim().toLowerCase() === currentPairOfWords.english;

			if (isCorrect) {
				handleCorrectAnswer();
			} else {
				handleIncorrectAnswer();
			}
		}
	};

	async function saveProgress() {
		setInputValue("");
		setCurrentPairOfWords(null);
		setShowModalSave(true);
		await setWords(draftWordsStateRef.current);
	}

	return (
		<div className={styles.container}>
			<TranslationDirectionSwitcher transIntoRu={transIntoRu} setTransIntoRu={setTransIntoRu} isDisabled={isDisabled}/>
			<div className={styles.wrap_word}>
				{currentPairOfWords ? (
					transIntoRu ? (
						<p className={styles.card_word}>{currentPairOfWords.english}</p>
					) : (
						<p className={styles.card_word}>{currentPairOfWords.russian}</p>
					)
				) : !hasWords ? (
					<button onClick={startTraining}>Начать</button> //подумать над названием кнопки
				) : (
					<div className={styles.congratulations_container}>
						<p className={styles.congratulations_text}>Вы выучили все слова из списка! Поздравляем!!!</p>
						<NavLink className={styles.add_words_link} to='/newWord'>Добавить еще слова</NavLink>
					</div>
				)}
			</div>
			<div className={styles.wrap_input}>
				<input
					className={`${styles.input} ${isError ? styles.input_error : ""}`}
					type="text"
					onChange={handleInputChange}
					disabled={isDisabled}
					value={inputValue}
					onKeyDown={handleKeyDown}
					placeholder="Для отправки ответа нажмите клавишу Enter"
				/>
			</div>
			<button className={styles.buttonSaveProgress} onClick={saveProgress} disabled={isDisabled}>
				Сохранить прогресс
			</button>
			{showModalSave && (
				<ModalBox
					message="Прогресс успешно сохранен!"
					duration={3000}
					onClose={() => setShowModalSave(false)}
				/>
			)}
		</div>
	);
};

export default SimulatorPage;
