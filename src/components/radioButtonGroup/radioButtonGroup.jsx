import RadioButton from "../radioButton/radioButton"; // Импортируем компонент
import styles from "./radioButtonGroup.module.css"; // Подключите ваши стили

const RadioButtonGroup = ({ value, onChange }) => {
  return (
    <div className={styles.radio_wrap}>
      <RadioButton
        label="Все слова"
        name="filterWords"
        value="all"
        checked={value === "all"}
        onChange={onChange}
      />
      <RadioButton
        label="Осталось выучить"
        name="filterWords"
        value="toLearn"
        checked={value === "toLearn"}
        onChange={onChange}
      />
      <RadioButton
        label="Выучены"
        name="filterWords"
        value="learned"
        checked={value === "learned"}
        onChange={onChange}
      />
    </div>
  );
};

export default RadioButtonGroup;
