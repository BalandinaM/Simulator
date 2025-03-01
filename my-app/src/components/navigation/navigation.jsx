import { NavLink } from "react-router-dom";
import styles from "./navigation.module.css";

const Navigation = () => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.nav_list}>
				<li className={styles.list_item}>
					<NavLink to="/home" className={styles.link}>
						Главная
					</NavLink>
				</li>
				<li className={styles.list_item}>
					<NavLink to="/newWord" className={styles.link}>
						Ввод новых слов
					</NavLink>
				</li>
				<li className={styles.list_item}>
					<NavLink to="/simulator" className={styles.link}>
						Тренажер
					</NavLink>
				</li>
				<li className={styles.list_item}>
					<NavLink to="/listWord" className={styles.link}>
						Список слов
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
