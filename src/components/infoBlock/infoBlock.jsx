import { NavLink } from 'react-router-dom';
import styles from './infoBlock.module.css';


const InfoBlock = ({message, link, textLink, className}) => {
	return (
		<div className={`${styles.container} ${className || ''}`}>
			<p className={styles.text}>{message}</p>
			<NavLink className={styles.link} to={link}>
				{textLink}
			</NavLink>
		</div>
	);
};

export default InfoBlock;
