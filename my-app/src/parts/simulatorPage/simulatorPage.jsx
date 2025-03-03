//import { NavLink } from 'react-router-dom';
import styles from './simulatorPage.module.css';
import { useLoaderData } from 'react-router-dom';
import { getWords } from "../../forStorage";

export async function loader() {
	const words = await getWords();
	return {words};
}

const SimulatorPage = () => {
	const { words } = useLoaderData();

	return (
		<div className={styles.container}>
			<h1>Сам тренажер</h1>
			{words.length ? (
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
			)}
		</div>
	);
};

export default SimulatorPage;
