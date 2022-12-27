import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CiWarning } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { http } from "services/Http/axios";
import { VscCheckAll } from "react-icons/vsc";
function VerifyConfirmationPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    const response = http
      .get(`/account/register/verifycode/?email=${email}&token=${token}`)
      .then((res) => {
        setLoading(false);
        console.log(res);

        setResult(res?.data?.status);
        setIsVerify(true);
      })
      .catch((err) => {
        setResult(err?.response?.data?.status);
        setLoading(false)
        console.log(err?.response?.data?.status);
        setIsVerify(false);
      });
  }, [token]);

  const checkQuery =
    token === null ||
    token === undefined ||
    email === null ||
    email === undefined;

  if (checkQuery) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-row justify-center">
          <CiWarning className="animate-bounce text-[55px] text-red-600" />
          <p className="text-[40px] px-2 text-red-600">درخواست نامعتبر</p>
        </div>
        <p className="text-lg px-2 text-blue-600 mt-10">
          <Link to="/">بازگشت به سایت</Link>
        </p>
      </div>
    );
  } else {
    if (loading) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-row justify-center">
            <AiOutlineLoading3Quarters className="animate-spin text-[30px] " />
            <p className="text-2xl px-2">منتظر دریافت پاسخ</p>
          </div>
        </div>
      );
    } else {
      if (result === "خوش آمدی") {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-center">
              <VscCheckAll className="text-[100px] text-green-600 animate-bounce" />
              <p className="text-[40px] py-4 text-green-600">
                تایید هویت و ثبت نام شما با موفقیت انجام شد
              </p>
              <p>در حال انتقال به صفحه ورود ... </p>

              <div className="flex flex-row ">
                <p>
                  اگر بعد از 5 ثانیه منتقل نشدید روی
                  <Link to="/login" className="text-blue-600">
                    اینجا
                  </Link>
                  کلیک کنید
                </p>
              </div>
            </div>
          </div>
        );
      } else if (result === "توکن درست نیست") {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-row justify-center">
              <CiWarning className="animate-bounce text-[55px] text-red-600" />
              <p className="text-[40px] px-2 text-red-600">
                درخواست شما نامعتبر است
              </p>
            </div>
            <p className="text-lg px-2 text-blue-600 mt-10">
              <Link to="/">بازگشت به سایت</Link>
            </p>
          </div>
        );
      } else if (result === "توکن شمامنقضی شد") {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-row justify-center">
              <CiWarning className="animate-bounce text-[55px] text-red-600" />
              <p className="text-[40px] px-2 text-red-600">
                درخواست شما منقضی شده است
              </p>
            </div>
            <p className="text-lg px-2 text-blue-600 mt-10">
              <Link to="/">بازگشت به سایت</Link>
            </p>
          </div>
        );
      } else if (result === "قبلا تایید شد لاگین کنید") {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-row justify-center">
              <CiWarning className="animate-bounce text-[55px] text-red-600" />
              <p className="text-[40px] px-2 text-red-600">
                کاربر قبلا ثبت نام شده است
              </p>
            </div>
            <p className="text-lg px-2 text-blue-600 mt-10">
              <Link to="/login">ورود به صفحه ورود</Link>
            </p>
          </div>
        );
      } else {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="flex flex-row justify-center">
              <CiWarning className="animate-bounce text-[55px] text-red-600" />
              <p className="text-[40px] px-2 text-red-600">درخواست نامعتبر</p>
            </div>
            <p className="text-lg px-2 text-blue-600 mt-10">
              <Link to="/">بازگشت به سایت</Link>
            </p>
          </div>
        );
      }
    }
  }
}

export { VerifyConfirmationPage };
