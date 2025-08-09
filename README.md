
# 📚 English Word Master

[![Demo](https://img.shields.io/badge/Live_Demo-FF5722?style=for-the-badge)](https://balandinam.github.io/Simulator/)
[![GitHub](https://img.shields.io/badge/Code-181717?style=for-the-badge&logo=github)](https://github.com/BalandinaM/Simulator)

Интерактивный тренажер для запоминания английских слов с системой повторения и персональным словарем.

## ✨ Особенности
- 📝 Добавление слов парами (английский ↔ русский)
- 🔁 Два режима тренировки (EN→RU и RU→EN)
- 📊 Система повторения (алгоритм интервальных повторений)
- ✏️ Редактирование и фильтрация словаря
- 💾 Локальное сохранение прогресса (LocalForage)

## 🛠 Технологии
- **Frontend**: React 19 + Vite
- **State Management**: Redux Toolkit + Immer
- **Forms**: Formik + Yup
- **Routing**: React Router
- **Storage**: LocalForage
- **Деплой**: GitHub Pages

## 🚀 Запуск
1. Установите зависимости:

```npm install```

2. Запустите dev-сервер:

```npm run dev```

### Для production-сборки:

```npm run build```


## 📸 Скриншоты

| Описание | Скриншот |
|----------|----------|
| **Главный экран** | ![Главный экран](./assets/screenshots_for_readme/main.png) |
| **Ввод новых слов** | ![Ввод новых слов](./assets/screenshots_for_readme/entering_new_words.png) |
| **Режим тренажера** | ![Тренажер](./assets/screenshots_for_readme/simulator.png) |
| **Список слов** | ![Список слов](./assets/screenshots_for_readme/list_of_words.png) |
| **Фильтрация слов** | ![Соротировка](./assets/screenshots_for_readme/sorting.png) |
| **Редактирование** | ![Редактитрование](./assets/screenshots_for_readme/editing.png) |


## 📌 Планы по развитию

- Добавить авторизацию и синхронизацию между устройствами
- Адаптация интерфейса под смартфоны и планшеты
