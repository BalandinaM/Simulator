import styles from './translationDirectionSwitcher.module.css';

const TranslationDirectionSwitcher = ({transIntoRu, setTransIntoRu}) => {
	return (
		<div className={styles.wrap_switchTranslete}>
			{transIntoRu ? <p>Английский</p> : <p>Русский</p>}
			<button onClick={() => setTransIntoRu(!transIntoRu)}>Сменить направление перевода</button>
			{!transIntoRu ? <p>Английский</p> : <p>Русский</p>}
		</div>
	);
};

export default TranslationDirectionSwitcher;
