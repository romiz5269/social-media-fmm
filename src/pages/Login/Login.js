import { useRef, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "store/Reducers/Users/UsersReducer";

function Login() {

  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const LoginError = useSelector((state) => state.users.AuthError);

  const authToken = useSelector((state) => state.users.userAuthToken);
  useEffect(() => {
    if (success && authToken) {
      localStorage.setItem("authToken", authToken);
      console.log("effect ran");
      Navigate("/home");
    }
  }, [success, authToken]);
  console.log(authToken);

  const handleSubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("username", user);
    bodyFormData.append("password", pwd);
    dispatch(UserLogin(bodyFormData));
    setSuccess(true);
  };
  return (
    <section className="form-section pt-20">
      <div className="grid grid-cols-12 shadow-xl rounded-md mx-auto sm:w-3/5">
        <div className="sm:col-span-6 col-span-12 px-5">
          <p
            disabled={LoginError ? false : true}
            className={LoginError ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {LoginError}
          </p>

          <form onSubmit={handleSubmit}>
            <h2 className="font-Vazirmatn">فرم ثبت نام</h2>
            <label className="font-Vazirmatn" htmlFor="username">
              نام کاربری :
            </label>
            <input
              type="text"
              dir="ltr"
              ref={userRef}
              id="username"
              name="username"
              placeholder="نام کاربری ... "
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="font-Vazirmatn"
            />

            <label className="font-Vazirmatn" htmlFor="password">
              کلمه عبور :
            </label>
            <input
              type="password"
              id="password"
              ref={userRef}
              name="password"
              dir="ltr"
              className="font-Vazirmatn pl-3"
              placeholder="کلمه عبور ... "
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <div className="flex flex-row">
              <p className="text-sm pt-2 pr-2 font-Vazirmatn">
                رمز عبور خود را فراموش کرده ام
              </p>
              <Link
                className="text-sm mt-2 mr-2 text-orange-500 underline"
                to="/forgotpassword/configuration"
              >
                فراموش کلمه عبور
              </Link>
            </div>
            <button
              className="bg-blue-500 disabled:bg-slate-300 rounded-md my-5 text-white font-Vazirmatn"
              disabled={!user || !pwd ? true : false}
            >
              ورود به حساب
            </button>
            <div className="flex flex-row">
              <p className="text-sm pt-2 pr-2 font-Vazirmatn">
                آیا حساب کاربری ندارید ؟
              </p>
              <Link
                className="text-sm mt-2 mr-2 text-orange-500 underline"
                to="/register"
              >
                ساخت حساب
              </Link>
            </div>
          </form>
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
