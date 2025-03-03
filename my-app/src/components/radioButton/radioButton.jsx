import styles from './radioButton.module.css';

const RadioButton = ({ label, name, value, checked, onChange }) => {
  return (
    <label className={styles.label}>
      {label}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
};

export default RadioButton;
