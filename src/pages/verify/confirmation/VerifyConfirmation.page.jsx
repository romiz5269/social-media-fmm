import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";

function VerifyConfirmationPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    document.body.dir = "ltr";
  }, []);
  const [loading, setLoading] = useState(false);
  const [inp1Value, setInp1Value] = useState("");
  const [inp2Value, setInp2Value] = useState("");
  const [inp3Value, setInp3Value] = useState("");
  const [inp4Value, setInp4Value] = useState("");
  const [submitVerify, setSubmitVerify] = useState(false);

  const inp1Focused = useRef();
  const inp2Focused = useRef();
  const inp3Focused = useRef();
  const inp4Focused = useRef();
  const submitFocused = useRef();
  useEffect(() => {
    inp1Focused.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const userCode = inp1Value + inp2Value + inp3Value + inp4Value;
    setLoading(true);
    setTimeout(() => {
      if(userCode.includes(code))
      {
        console.log('Ok')
      }
       
    }, [3000]);
    setLoading(false);
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
      <p>Code is: {searchParams.get("code")}</p>

      {loading ? (
        <div>loading ... </div>
      ) : (
        <form
          className="sm:w-[300px] border border-slate-[#f4f4f4] shadow-md py-5 px-1"
          onSubmit={(e) => submitHandler(e)}
        >
          <h4 className="text-center mb-4 pb-3 font-Vazirmatn">
            کد ارسال شده را وارد کنید
          </h4>
          <div className="mb-5 flex flex-row justify-around">
            <input
              type="tel"
              maxlength="1"
              // pattern="[0-9]"
              className=" border border-[#ccc] text-center text-lg rounded-lg  focus:outline-blue-500 focus:shadow-lg h-[50px] w-[50px]"
              value={inp1Value}
              onChange={(e) => setInp1Value(e.target.value)}
              onKeyUp={(e) => {
                if (e.code === "Backspace" && e.key === "Backspace") {
                  inp1Focused.current.focus();
                  setInp1Value("");
                } else {
                  inp2Focused.current.focus();
                }
              }}
              ref={inp1Focused}
            />
            <input
              type="tel"
              maxlength="1"
              // pattern="[0-9]"
              className="border border-[#ccc] text-center text-lg rounded-lg  focus:outline-blue-500 focus:shadow-lg h-[50px] w-[50px]"
              value={inp2Value}
              onChange={(e) => setInp2Value(e.target.value)}
              // onKeyUp={() => inp3Focused.current.focus()}
              onKeyUp={(e) => {
                if (e.code === "Backspace" && e.key === "Backspace") {
                  inp1Focused.current.focus();
                  setInp2Value("");
                } else {
                  inp3Focused.current.focus();
                }
              }}
              ref={inp2Focused}
            />
            <input
              type="tel"
              maxlength="1"
              // pattern="[0-9]"
              className=" border border-[#ccc] text-center text-lg rounded-lg  focus:outline-blue-500 focus:shadow-lg h-[50px] w-[50px]"
              ref={inp3Focused}
              onChange={(e) => setInp3Value(e.target.value)}
              // onKeyUp={() => inp4Focused.current.focus()}
              onKeyUp={(e) => {
                if (e.code === "Backspace" && e.key === "Backspace") {
                  inp2Focused.current.focus();
                  setInp3Value("");
                } else {
                  inp4Focused.current.focus();
                }
              }}
              value={inp3Value}
            />
            <input
              type="tel"
              maxlength="1"
              // pattern="[0-9]"
              className="border border-[#ccc]  text-center text-lg rounded-lg  focus:outline-blue-500 focus:shadow-lg h-[50px] w-[50px]"
              onChange={(e) => setInp4Value(e.target.value)}
              // onKeyUp={() => submitFocused.current.focus()}
              onKeyUp={(e) => {
                if (e.code === "Backspace" && e.key === "Backspace") {
                  inp3Focused.current.focus();
                  setInp4Value("");
                } else {
                  submitFocused.current.focus();
                }
              }}
              ref={inp4Focused}
              value={inp4Value}
            />
          </div>
          <div className="px-4">
            <button
              type="submit"
              className="w-full text-white py-2 rounded-md outline-non"
              style={{ backgroundColor: "#007BFF" }}
              ref={submitFocused}
              //   disabled={submitVerify ? false : true}
            >
              Verify account
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export { VerifyConfirmationPage };
