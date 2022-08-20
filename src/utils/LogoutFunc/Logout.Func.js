import { useNavigate } from "react-router-dom";

const LogoutUser = () => {
  const navigate = useNavigate();
  localStorage.removeItem("authToken");
  navigate("/login", { replace: true });
};
export default LogoutUser