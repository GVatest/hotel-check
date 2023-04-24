import { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./styles.module.scss"

function Layout({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={styles.layout} {...props}>
      {children}
    </div>
  );
}

export default Layout;
