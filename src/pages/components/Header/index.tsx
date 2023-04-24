import styles from "./styles.module.scss";
import { Logout } from "features";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Simple Hotel Check</h1>
      <Logout />
    </header>
  );
}

export default Header;
