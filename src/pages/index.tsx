import { useAppSelector } from "app/store/hooks";
import { selectIsLoggedIn } from "features";
import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Protected } from "shared";
import { Paths } from "./paths";

const Login = lazy(() => import("./Login"));
const Hotels = lazy(() => import("./Hotels"));

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route path='/' element={<Navigate to={Paths.LOGIN} />} />
      <Route path={Paths.LOGIN} element={<Login />} />
      <Route
        path={Paths.HOTELS}
        element={
          <Protected isLoggedIn={isLoggedIn} redirectTo={Paths.LOGIN}>
            <Hotels />
          </Protected>
        }
      />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};
