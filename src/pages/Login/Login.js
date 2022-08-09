import AuthContext from "Context/AuthContext/AuthContext.auth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useRef, useEffect, useState, useContext } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { http } from "services/Http/axios";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const handleRefresh = async () => {
    const response = await axiosPrivate
      .post("/polls/token/refresh/", {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("username", user);
    bodyFormData.append("password", pwd);

    try {
      const response = await http.post("/polls/token/", bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      console.log(response);
      const accessToken = response?.data;
      console.log(accessToken);
      setAuth({ user, pwd, accessToken });
      setUser("");
      setPwd("");
      localStorage.setItem('authToken',JSON.stringify(accessToken))
      Navigate("/home", { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <section className="form-section pt-20">
      <div className="grid grid-cols-12 shadow-xl rounded-md mx-auto sm:w-3/5">
        <div className="sm:col-span-6 col-span-12 px-5">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
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
              name="password"
              ref={userRef}
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
