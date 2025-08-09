import { NavLink } from "react-router-dom";
import styles from "./navigation.module.css";

const Navigation = () => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.nav_list}>
				<li className={styles.list_item}>
					<NavLink to="/home" className={({isActive}) => isActive ? `${styles.link} ${styles.link_current}` : styles.link}>
						Главная
					</NavLink>
				</li>
				<li className={styles.list_item}>
					<NavLink to="/newWord" className={({isActive}) => isActive ? `${styles.link} ${styles.link_current}` : styles.link}>
						Ввод новых слов
					</NavLink>
				</li>
				<li className={styles.list_item}>
					<NavLink to="/simulator" className={({isActive}) => isActive ? `${styles.link} ${styles.link_current}` : styles.link}>
						Тренажер
					</NavLink>
				</li>
				<li className={styles.list_item}>
					<NavLink to="/listWords" className={({isActive}) => isActive ? `${styles.link} ${styles.link_current}` : styles.link}>
						Список слов
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
