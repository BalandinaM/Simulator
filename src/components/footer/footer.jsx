import { NavLink } from "react-router-dom";
import styles from "./footer.module.css"

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
			<NavLink className={styles.link} to="https://t.me/Balandina_MS">&copy; Marina Balandina</NavLink>
			</div>
		</footer>
	);
}

export default Footer;
