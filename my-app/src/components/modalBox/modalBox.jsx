import { useState, useEffect } from "react";
import styles from './modalBox.module.css';

const ModalBox = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Скрываем сообщение через указанное время
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Очищаем таймер при размонтировании компонента
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className={styles.alert}>
      {message}
      <button onClick={() => setIsVisible(false)} className={styles.closeButton}>
        ×
      </button>
    </div>
  );
};

export default ModalBox;
