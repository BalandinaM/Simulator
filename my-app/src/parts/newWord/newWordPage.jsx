//import Textarea from '../../components/textarea/textarea';
import { useState, useEffect } from "react";
import styles from './newWordPage.module.css'
import { Form, useActionData } from "react-router-dom";
import { createWord } from "../../forStorage";

export async function action({request}) {
	const formData = await request.formData();
	const dates = Object.fromEntries(formData);
	//console.log(dates.newWords);
	const word = await createWord(dates);
	return {success: true,  word };
}

const NewWordPage = () => {
	const [value, setValue] = useState("");
	const actionData = useActionData();

	// Сброс состояния после успешной отправки
  useEffect(() => {
    if (actionData?.success) {
      setValue(""); // Сбрасываем значение текстового поля
    }
  }, [actionData]);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Помогите нам создать ваш персональный словарь!</h2>
			<p className={styles.text}>Введите пары слов в поле ниже:</p>
			<ul className={styles.list}>
				<li>Каждую пару слов пишите с новой строки.</li>
				<li>Сначала напишите слово на английском, затем через пробел — его перевод.</li>
			</ul>
			<p className={styles.text}>Ваши слова будут сохранены, и вы сможете легко их учить. Начните прямо сейчас!</p>
			<p className={styles.text}>Совет: Чем больше слов вы добавите, тем быстрее расширите свой словарный запас!</p>
			<Form method="post">
				<textarea
					className={styles.textarea}
					name="newWords"
					id="newWords"
					value={value}
					onChange={(event) => setValue(event.target.value)}
					placeholder="apple яблоко"
					rows="15"
					cols="50"
				/>
				<button className={styles.button_save}type="submit">Сохранить</button>
			</Form>
		</div>
	);
}

export default NewWordPage;

// настроить текстареа
