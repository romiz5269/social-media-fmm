import React from 'react'
import numberToPersian from 'utils/toPersianNumbers/toPersianNumbers';

function ProfileTopbar({username,postcount}) {
  return (
    <>
      <span className="text-lg font-[600] dark:text-white">
        {username}
      </span>
      <div className="text-slate-600 font-semibold">
        <span className="text-xs text-slate-500 dark:text-white font-[500]">
          {postcount && numberToPersian(postcount)}
        </span>
        <span className="font-Vazirmatn text-xs text-slate-500 dark:text-slate-300 font-[500] pr-1">
          پست ها
        </span>
      </div>
    </>
  );
}

export default ProfileTopbar
