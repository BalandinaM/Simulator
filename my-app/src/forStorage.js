import { nanoid } from '@reduxjs/toolkit';
import localforage from 'localforage';

export async function getWords() {// функция для получения слов из хранилища
	await someNetwork();
	let words = await localforage.getItem('words');
	if (!words) words = [];
	return words;
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
			eng,
			rus,
			isLearn: false,
			isEdit: false,
		}
	})
	let words = await getWords();
	for (let i = 0; i < newWordsArr.length; i++) {
		words.unshift(newWordsArr[i]);
	}
	await setWords(words);
}

function setWords(words) {
	return localforage.setItem('words', words);
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
