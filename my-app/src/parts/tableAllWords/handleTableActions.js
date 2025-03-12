import { produce } from "immer";

// Поиск индекса элемента по id
export const findIndexById = (array, id) => {
  return array.findIndex((item) => item.id === id);
};

// Отключение редактирования для элемента
// export const disableEditing = (draft, index) => {
//   draft[index].isEdit = false;
// };

// // Включение редактирования для элемента
// export const enableEditing = (draft, index) => {
//   draft[index].isEdit = true;
// };

// // Запуск редактирования для элемента
// export const startEditing = (id, setWordsState, wordsState, setIsEditing) => {
//   setIsEditing(true);
//   const index = findIndexById(wordsState, id);

//   if (index !== -1) {
//     setWordsState(
//       produce((draft) => {
//         enableEditing(draft, index);
//       })
//     );
//   }
// };

// //Обновление данных в стейте
// export const updateWordState = (draft, index, wordId, newValue) => {
//   // Ищем элемент в draft[index]
//   const changeElem = Object.values(draft[index]).find(
//     (item) => item.idEng === wordId || item.idRus === wordId
//   );

//   // Если элемент найден, обновляем его
//   if (changeElem) {
//     if (changeElem.eng) {
//       changeElem.eng = newValue; // Обновляем eng
//     } else if (changeElem.rus) {
//       changeElem.rus = newValue; // Обновляем rus
//     }
//   } else {
//     console.warn("Элемент не найден");
//   }
// };

// //отключение редактирования предыдущего поля
// export const disablePreviousEditing = (wordsState, setWordsState) => {
//   const indexPrevEdit = wordsState.findIndex((word) => word.isEdit === true);

//   if (indexPrevEdit !== -1) {
//     setWordsState(
//       produce((draft) => {
//         draft[indexPrevEdit].isEdit = false; // Отключаем редактирование
//       })
//     );
//   }
// };
