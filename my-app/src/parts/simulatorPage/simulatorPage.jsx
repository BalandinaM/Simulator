//import { NavLink } from 'react-router-dom';
import styles from './simulatorPage.module.css';
import { useLoaderData } from 'react-router-dom';
import { getWords } from "../../forStorage";
import { useState } from "react";
import TranslationDirectionSwitcher from '../../components/translationDirectionSwitcher/translationDirectionSwitcher';

export async function loader() {
	const words = await getWords();
	return {words};
}

const SimulatorPage = () => {
	const { words } = useLoaderData();
	const [transIntoRu, setTransIntoRu] = useState(true);
	console.log(words);


	return (
		<div className={styles.container}>
			<TranslationDirectionSwitcher transIntoRu={transIntoRu} setTransIntoRu={setTransIntoRu}/>
			{/* <div className={styles.wrap_switchTranslete}>
				{transIntoRu ? <p>Английский</p> : <p>Русский</p>}
				<button onClick={() => setTransIntoRu(!transIntoRu)}>Сменить направление перевода</button>
				{!transIntoRu ? <p>Английский</p> : <p>Русский</p>}
			</div> */}
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
