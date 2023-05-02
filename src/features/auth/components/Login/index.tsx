import { Button, Input, Layout } from "shared";
import styles from "./styles.module.scss";
import { login } from "../../store";
import { useFormik } from "formik";
import { useAppDispatch } from "app/store/hooks";
import { useEffect } from "react";
import { api } from "../../api";
import { setAuth } from "../../store";
import validator from "validator";

const validate = (values: { email: string; password: string }) => {
  const errors = {} as typeof values;

  if (!values.email) {
    errors.email = "Необходимо заполнить";
  } else if (!validator.isEmail(values.email)) {
    errors.email = "Некорректный формат email";
  }

  if (!values.password) {
    errors.password = "Необходимо заполнить";
  } else if (
    !validator.isStrongPassword(values.password, {
      minLength: 8,
      minLowercase: 0,
      minSymbols: 0,
      minUppercase: 0,
      minNumbers: 0,
    }) ||
    validator.isEmpty(values.password, { ignore_whitespace: true })
  ) {
    errors.password = "Неверный формат пароля";
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
