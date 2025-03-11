//import { NavLink } from 'react-router-dom';
import styles from './simulatorPage.module.css';
import { useLoaderData } from 'react-router-dom';
import { getWords } from "../../forStorage";
import { useState } from "react";

export async function loader() {
	const words = await getWords();
	return {words};
}

const SimulatorPage = () => {
	const { words } = useLoaderData();
	const [transIntoRu, setTransIntoRu] = useState('true');
	console.log(words);

	return (
		<div className={styles.container}>
			<div className={styles.wrap_switchTranslete}>
				<p>Английский</p>
				<button>Сменить направление перевода</button>
				<p>Русский</p>
			</div>
			<div className={styles.wrap_word}>
				<p>WORD</p>
			</div>
			<div className={styles.wrap_input}>
				<input type="text" />
				<button>Проверить</button>
			</div>
		</div>
	);
};

export default SimulatorPage;
{/* {words.length ? (
				<div>
					{words.map((word) => (
						<>
							<p>{word.eng ? word.eng : <i>No word</i>}</p>
							<p>{word.rus ? word.rus : <i>No word</i>}</p>
						</>
					))}
				</div>
			) : (
				<p><i>no word here... </i></p>
			)} */}
