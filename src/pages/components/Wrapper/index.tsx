import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

function Wrapper({ children }: PropsWithChildren) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Wrapper;
