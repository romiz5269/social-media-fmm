import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "store/Reducers/Users/UsersReducer";
import LoginBackground from "assets/images/Login/login-sidebar.jpg";
import LoginBodyBackground from "assets/images/Login/body-background-3.webp";
import { Helmet } from "react-helmet";
import LoginFormData from "components/Login/LoginFormData/LoginFormData.component";
import toast, { Toaster } from "react-hot-toast";

const LoginStyle = {
  backgroundImage: `url(${LoginBodyBackground})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
};
const LoginSideBackground = {
  backgroundImage: `url(${LoginBackground})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
};

function Login() {
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const [capsLockCheck, setCapsLockCheck] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const LoginError = useSelector((state) => state.users.AuthError);
  const authToken = useSelector((state) => state.users.userAuthToken);
  useEffect(() => {
    var usernameInp = document.getElementById("email");
    var passwordInp = document.getElementById("password");

    usernameInp.addEventListener("keyup", function (event) {
      if (event.getModifierState("CapsLock")) {
        setCapsLockCheck(true);
      } else {
        setCapsLockCheck(false);
      }
    });
    passwordInp.addEventListener("keyup", function (event) {
      if (event.getModifierState("CapsLock")) {
        setCapsLockCheck(true);
      } else {
        setCapsLockCheck(false);
      }
    });
    if (success && authToken) {
      localStorage.setItem("authToken", authToken);
      Navigate("/home");
    }
  }, [success, authToken]);

  useEffect(() => {
    if (LoginError !== null) {
      toast.error(LoginError);
    }
  }, [LoginError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", pwd);
    dispatch(UserLogin(bodyFormData));
    setSuccess(true);
  };
  return (
    <>
      <Helmet>
        <title>سوشیال | ورود</title>
      </Helmet>
      <Toaster position="top-center" />
      <section
        className="form-section flex flex-col md:items-center items-end sm:justify-center justify-end  pt-0 min-h-screen"
        style={LoginStyle}
      >
        <div className="grid grid-cols-12 shadow-2xl rounded-md mx-auto 2xl:w-3/6 xl:3/6 lg:w-4/6 md:w-5/6 sm:w-full w-full sm:min-h-0 min-h-screen ">
          <div className="sm:col-span-6 col-span-12 px-5 bg-white rounded-tr-lg rounded-br-lg flex flex-col justify-start sm:py-0 pt-20">
            <p
              disabled={LoginError ? false : true}
              className={LoginError ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {LoginError}
            </p>

            <LoginFormData
              email={email}
              setEmail={setEmail}
              capsLockCheck={capsLockCheck}
              pwd={pwd}
              setPwd={setPwd}
              handleSubmit={handleSubmit}
              userRef={userRef}
              passShow={passShow}
              setPassShow={setPassShow}
            />
          </div>
          <div
            className="sm:col-span-6 col-span-12 sm:block hidden bg-orange-500 object-fill rounded-tl-xl rounded-bl-xl"
            style={LoginSideBackground}
          ></div>
        </div>
      </section>
    </>
  );
}

export { Login };
