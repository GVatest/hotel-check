import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

function Button({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}

export default Button;
