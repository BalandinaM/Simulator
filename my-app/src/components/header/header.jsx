import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
				{/* <div className={styles.container}> */}
					<p className={styles.slogan}>English Word Master</p>
					<div>
						<NavLink to="/signup">Регистрация</NavLink>
						<NavLink to="/login">Авторизация</NavLink>
					</div>
				{/* </div> */}
		</header>
	)
}

export default Header;
