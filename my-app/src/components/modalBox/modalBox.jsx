import { useState, useEffect } from "react";
import styles from './modalBox.module.css';

const ModalBox = ({ message, duration = 3000, onClose, variant = 'info' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Скрываем сообщение через указанное время
    const timer = setTimeout(() => {
      setIsVisible(false);
			if (onClose) onClose();
    }, duration);

    // Очищаем таймер при размонтировании компонента
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

	const alertClass = `${styles.alert} ${styles[variant]}`;

  return (
    <div className={alertClass}>
      {message}
      <button onClick={() => {setIsVisible(false); if (onClose) onClose();}} className={styles.closeButton}>
        ×
      </button>
    </div>
  );
};

export default ModalBox;
