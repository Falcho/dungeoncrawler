import styles from "./Button.module.css";

const Button = ({ onclick, buttonText, disabled }) => {
  return (
    <button
      className={styles.button}
      onClick={onclick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}
export default Button;