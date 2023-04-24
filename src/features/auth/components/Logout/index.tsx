import { useAppDispatch } from "app/store/hooks";
import styles from "./styles.module.scss";
import { ReactComponent as LogoutIcon } from "assets/icons/logout.svg";
import { logout } from "../../store";

function Logout() {
  const dispatch = useAppDispatch();
  return (
    <div onClick={() => dispatch(logout())} className={styles.logout}>
      <span>Выйти</span>
      <LogoutIcon />
    </div>
  );
}

export default Logout;
