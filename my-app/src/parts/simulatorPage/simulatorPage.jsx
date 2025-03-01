import { NavLink } from 'react-router-dom';
import styles from './simulatorPage.module.css';

const SimulatorPage = () => {
	return (
		<div className={styles.container}>
			<h1>Сам тренажер</h1>
			{/* <nav>
				<ul>
					<li><NavLink to='/newWord'>Ввод новых слов</NavLink></li>
					<li><NavLink to='/simulator'></NavLink>Тренажер</li>
					<li><NavLink to='/listWord'>Список слов</NavLink></li>
				</ul>
			</nav> */}
		</div>
	);
};

export default SimulatorPage;
