import { nanoid } from '@reduxjs/toolkit';
import localforage from 'localforage';

export async function getWords() {// функция для получения слов из хранилища
	await someNetwork();
	let wordsArray = await localforage.getItem('wordsArray');
	if (!wordsArray) wordsArray = [];
	return wordsArray;
}

export async function createWord(dates) { //создание нового слова и добавление его в хранилище
	await someNetwork();
	let arr = dates.newWords.split('\n');
	for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i].trim();
	}
	let newWordsArr = arr.map(item => {
		const [eng, rus] = item.split(' ');
		return {
			id: nanoid(4),
			english: eng,
			russian: rus,
			isLearn: false,
		}
	})
	let wordsArray = await getWords();
	for (let i = 0; i < newWordsArr.length; i++) {
		wordsArray.unshift(newWordsArr[i]);
	}
	await setWords(wordsArray);
}

export async function setWords(wordsArray) {
	try {
    await localforage.setItem("wordsArray", wordsArray);
  } catch (error) {
    console.error("Ошибка при сохранении данных в localforage:", error);
    throw error;
  }
}

let someCache = {};

async function someNetwork(key) { //имитация задержки сети
	if (!key) {
		someCache = {};
	}

	if (someCache[key]) {
		return;
	}

	someCache[key] = true;

	return new Promise((res) => {
		setTimeout(res, Math.random() * 700);
	});
}
