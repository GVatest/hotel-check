import { selectIsLoggedIn } from "features";
import styles from "./styles.module.scss";
import { LoginWidget } from "features";
import { useAppSelector } from "app/store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "pages/paths";

function Login() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate(Paths.HOTELS);
  }, [isLoggedIn]);

  return (
    <div className={styles.wrapper}>
      <LoginWidget />
      <div className={styles.background} />
    </div>
  );
}

export default Login;
