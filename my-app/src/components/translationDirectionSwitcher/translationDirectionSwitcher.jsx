import styles from './translationDirectionSwitcher.module.css';
import arrow from '../../assets/image/arrow_circular.png'

const TranslationDirectionSwitcher = ({transIntoRu, setTransIntoRu, isDisabled}) => {
	return (
		<div className={styles.wrap_switchTranslete}>
			{transIntoRu ? <span className={styles.rightSpan}>Английский</span> : <span className={styles.rightSpan}>Русский</span>}
			<button onClick={() => setTransIntoRu(!transIntoRu)} disabled={!isDisabled}>
				<img src={arrow} alt="Cменить направление перевода" width={25} height={25} />
			</button>
			{!transIntoRu ? <span className={styles.leftSpan}>Английский</span> : <span className={styles.leftSpan}>Русский</span>}
		</div>
	);
};

export default TranslationDirectionSwitcher;
