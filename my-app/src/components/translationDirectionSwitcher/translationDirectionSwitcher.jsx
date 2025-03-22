import styles from './translationDirectionSwitcher.module.css';

const TranslationDirectionSwitcher = ({transIntoRu, setTransIntoRu}) => {
	return (
		<div className={styles.wrap_switchTranslete}>
			{transIntoRu ? <span>Английский</span> : <span>Русский</span>}
			<button onClick={() => setTransIntoRu(!transIntoRu)}>
				<img src="arrow_circular.png" alt="Cменить направление перевода" width={25} height={25} />
			</button>
			{!transIntoRu ? <span>Английский</span> : <span>Русский</span>}
		</div>
	);
};

export default TranslationDirectionSwitcher;
