import { nanoid } from '@reduxjs/toolkit';
import localforage from 'localforage';

export async function getWords() {// функция для получения слов из хранилища
	await someNetwork();
	let wordsArray = await localforage.getItem('wordsArray');
	if (!wordsArray) wordsArray = [];
	return wordsArray;
}

function isOnlyLatin(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function isOnlyCyrillic(str) {
  return /^[а-яА-ЯёЁ]+$/.test(str);
}

export async function createWord(dates) { //создание нового слова и добавление его в хранилище
	await someNetwork();
	let arr = dates.newWords.split('\n');//разбиваем значение из value на массив по переносу строки
	console.log(arr);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = arr[i].trim().toLowerCase();//удаляем пробелы, приводим к нижнему регистру
		console.log(arr[i].length);
		if (arr[i].length === 0) { //удаляем пустые строки из массива
			arr.splice(i, 1);
			i--;
		}
	}
	let newWordsArr = arr
		.map((item) => {
			const [eng, rus] = item.split(/\s+/); //убираем все пробелы между словами
			if (eng === undefined || rus === undefined) {//проверка на пуcтое значение
				console.log("одно из слов имеет пустое значение!!!");
				return null;
			}
			if (isOnlyLatin(eng) && isOnlyCyrillic(rus)) {
				return {
					id: nanoid(4),
					english: eng,
					russian: rus,
					isLearn: false,
				};
			} else {
				return null;
			}
		})
		.filter((item) => item !== null);
	console.log(newWordsArr);
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
