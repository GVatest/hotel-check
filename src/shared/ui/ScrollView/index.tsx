import { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

function ScrollView({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={styles.scroll_view} {...props}>
      {children}
    </div>
  );
}

export default ScrollView;
