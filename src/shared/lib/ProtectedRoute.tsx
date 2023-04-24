import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  isLoggedIn: boolean;
  redirectTo: string;
};

export const Protected = ({
  isLoggedIn,
  redirectTo,
  children,
}: PropsWithChildren<ProtectedProps>) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
};
