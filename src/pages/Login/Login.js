import { useRef, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "store/Reducers/Users/UsersReducer";
import LoginForm from "components/Login/LoginForm";
import { axiosPrivate } from "services/Private/axiosPrivate";
import { http } from "services/Http/axios";

function Login() {

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const LoginError = useSelector((state) => state.users.AuthError);

  const authToken = useSelector((state) => state.users.userAuthToken);

  useEffect(() => {
    if (success && authToken) {
      Navigate("/home");
    }
  }, [success, authToken]);


  const handleSubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
   
    bodyFormData.append("email", email);
    bodyFormData.append("password", pwd);
    dispatch(UserLogin(bodyFormData));
    setSuccess(true);
  };
  const handleRefresh = async () => {
    try {
      const response = await axiosPrivate.post(
        `/login/api/token/refresh`,
        {},
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="form-section pt-20">
      <button onClick={(e) => handleRefresh()}>GET REFRESH</button>
      <div className="grid grid-cols-12 shadow-xl rounded-md mx-auto sm:w-3/5">
        <div className="sm:col-span-6 col-span-12 px-5">
          <p
            disabled={LoginError ? false : true}
            className={LoginError ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {LoginError}
          </p>

          <LoginForm
            email={email}
            setEmail={setEmail}
            pwd={pwd}
            setPwd={setPwd}
            handleSubmit={handleSubmit}
            userRef={userRef}
            success={success}
          />
        </div>
        <div
          className="sm:col-span-6 sm:block hidden bg-orange-500"
          style={{ height: "100%" }}
        ></div>
      </div>
    </section>
  );
}

export { Login };
