import { useNavigate } from "react-router-dom";

const LogoutUser = () => {
  console.log("logout RAN");
  const navigate = useNavigate();
  localStorage.removeItem("authToken");
  navigate("/login", { replace: true });
};
export default LogoutUser;
