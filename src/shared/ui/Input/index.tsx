import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type InputProps = {
  label?: string;
  variant?: "light" | "regular";
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ variant, label, id, error, ...props }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <label
        htmlFor={id}
        className={styles.label}
        style={{ fontWeight: variant === "regular" ? 400 : 300 }}
      >
        {label}
      </label>
      <input className={styles.input} {...props} />
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
}

export default Input;
