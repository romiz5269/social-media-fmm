import { useRef, useEffect, useState } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import { http } from "services/Http/axios";


// validate form fields with REGEX

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidateMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [checkTerms, setCheckTerms] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // validate username with regex Realtime

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  // validate email with regex realtime

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  // validate password with regex realtime and validate confirm password for match with password field

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidateMatch(match);
  }, [pwd, matchPwd]);

  // set Error Message for display above of form

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);


  // submit form 

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate username and password again in submit cycle

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    // save form data in FormData function

    let bodyFormData = new FormData();
    bodyFormData.append("username", user);
    bodyFormData.append("password", pwd);
    bodyFormData.append("password2", pwd);
    bodyFormData.append("email", email);

    // send request to register path for initial user

    try {
      const response = await http.post("/polls/register/", bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log(response);
 
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };
  return (
    <>
      {success ? (
        <div className="form-section">
          <p>success ! you Logged In</p>
        </div>
      ) : (
        <section className="form-section border-2 pt-20">
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
                  <span className={validName ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span className={validName || !user ? "hide" : "invalid"}>
                    <FaTimes />
                  </span>
                </label>
                <input
                  type="text"
                  dir="ltr"
                  id="username"
                  ref={userRef}
                  placeholder="نام کاربری ... "
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="font-Vazirmatn"
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && user && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  تعداد کاراکتر ها بین 4 تا 24 حرف باید باشد <br />
                 با یک حرف کوچک شروع شود<br />
                 حروف,اعداد,زیرخط,خط تیره مجاز هستند
                  Letters,numbsers,underscores,hyphens,allowed
                </p>

                <label className="font-Vazirmatn" htmlFor="email">
                  پست الکترونیک :
                  <span className={validEmail ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span className={validEmail || !email ? "hide" : "invalid"}>
                    <FaTimes />
                  </span>
                </label>
                <input
                  type="text"
                  id="email"
                  dir="ltr"
                  ref={userRef}
                  className="font-Vazirmatn"
                  placeholder="پست الکترونیک "
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="Emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="Emailnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  4 to 24 characters <br />
                  Must begin with a letter <br />
                  Letters,numbsers,underscores,hyphens,allowed
                </p>

                <label className="font-Vazirmatn" htmlFor="password">
                  کلمه عبور :
                  <span className={validPwd ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FaTimes />
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  dir="ltr"
                  className="font-Vazirmatn pl-3"
                  ref={userRef}
                  placeholder="کلمه عبور ... "
                  autoComplete="off"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && pwd && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  8 to 24 characters <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character
                  <br />
                  Allowed special characters :{" "}
                  <span aria-label="exclamation mark">!</span>
                  <span aria-label="at symbol">@</span>
                  <span aria-label="hashtag">#</span>
                  <span aria-label="dollar sign">$</span>
                  <span aria-label="percent">%</span>
                </p>
                <label className="font-Vazirmatn" htmlFor="confirmpassword">
                  تایید کلمه عبور :
                  <span className={validMatch ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  >
                    <FaTimes />
                  </span>
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  dir="ltr"
                  ref={userRef}
                  className="font-Vazirmatn pl-3"
                  placeholder="تایید کلمه عبور ... "
                  // style={{ fontFamily: "Vazirmatn" }}
                  autoComplete="off"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    matchFocus && matchPwd && !validMatch
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle />
                  Must be match with password
                </p>
                <div className="flex flex-row">
                  <input
                    type="checkbox"
                    required
                    onChange={() => setCheckTerms(!checkTerms)}
                  />
                  <p className="text-sm pt-2 pr-2 font-Vazirmatn">
                    قوانین سایت را مطالعه کرده ام و آن را می پذیرم
                  </p>
                </div>
                <button
                  className="bg-green-500 disabled:bg-slate-300 rounded-md my-5 text-white font-Vazirmatn"
                  disabled={
                    !validName ||
                    !validPwd ||
                    !validMatch ||
                    !checkTerms ||
                    !validEmail
                      ? true
                      : false
                  }
                >
                  ساخت حساب کاربری
                </button>
              </form>
            </div>
            <div
              className="sm:col-span-6 sm:block hidden bg-orange-500"
              style={{ height: "100%" }}
            ></div>
          </div>
        </section>
      )}
    </>
  );
}

export { Register };
