import styles from './radioButton.module.css';

const RadioButton = ({ label, name, value, checked, onChange }) => {
	return (
		<label className={`${styles.label} ${checked ? styles.checked : ''}`}>
			<input type="radio" name={name} value={value} checked={checked} onChange={onChange} className={styles.hiddenRadio}/>
			{label}
		</label>
	);
};

export default RadioButton;
