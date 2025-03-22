import DoubleArrowIcon from '../doubleArrowIcon/doubleArrowIcon';
import styles from './translationDirectionSwitcher.module.css';

const TranslationDirectionSwitcher = ({transIntoRu, setTransIntoRu}) => {
	return (
		<div className={styles.wrap_switchTranslete}>
			{transIntoRu ? <span>Английский</span> : <span>Русский</span>}
			<button onClick={() => setTransIntoRu(!transIntoRu)}><DoubleArrowIcon width={24} height={48} color="#F5F5F5"/></button>
			{!transIntoRu ? <span>Английский</span> : <span>Русский</span>}
		</div>
	);
};

export default TranslationDirectionSwitcher;
