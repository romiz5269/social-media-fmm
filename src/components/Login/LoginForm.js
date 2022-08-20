import { Link } from "react-router-dom";

const LoginForm = ({handleSubmit,setUser,user,pwd,setPwd,userRef}) => {
  return (
    <>
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
    </>
  );
}

export default LoginForm
