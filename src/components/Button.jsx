import styles from "./Button.module.css";

const Button = ({ onClick, buttonText, disabled }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}
export default Button;