import { Button, Input, Layout } from "shared";
import styles from "./styles.module.scss";
import { login } from "../../store";
import { useFormik } from "formik";
import { useAppDispatch } from "app/store/hooks";
import { useEffect } from "react";
import { api } from "../../api";
import { setAuth } from "../../store";

const validate = (values: { email: string; password: string }) => {
  const errors = {} as typeof values;

  if (!values.email) {
    errors.email = "Необходимо заполнить";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Некорректный формат email";
  }

  if (!values.password) {
    errors.password = "Необходимо заполнить";
  } else if (values.password.length < 8) {
    errors.password = "Пароль должен содержать не меньше 8 символов";
  }

  return errors;
};

function Login() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (api.checkAuth()) dispatch(setAuth({ name: "user" }));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <div className={styles.login}>
      <Layout>
        <h1>Simple Hotel Check</h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <Input
            label='Логин'
            value={formik.values.email}
            onChange={formik.handleChange}
            id='email'
            name='email'
            type='email'
            error={formik.errors.email}
          />
          <Input
            label='Пароль'
            value={formik.values.password}
            onChange={formik.handleChange}
            id='password'
            name='password'
            type='password'
            error={formik.errors.password}
          />
          <Button type='submit' style={{ marginTop: 8 }}>
            Войти
          </Button>
        </form>
      </Layout>
    </div>
  );
}

export default Login;
