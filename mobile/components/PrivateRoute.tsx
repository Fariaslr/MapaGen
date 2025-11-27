import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = localStorage.getItem("veterinario");
  return isAuth ? children : <Navigate to="/login" />;
}
