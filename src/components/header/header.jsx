import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
			<p className={styles.slogan}>English Word Master</p>
			<div className={styles.wrap_link}>
				<NavLink className={styles.header_link} to="/signup">
					Регистрация
				</NavLink>
				<NavLink className={styles.header_link} to="/login">
					Авторизация
				</NavLink>
			</div>
		</header>
	);
}

export default Header;
