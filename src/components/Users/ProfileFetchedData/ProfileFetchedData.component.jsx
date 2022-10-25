import React from 'react'
import numberToPersian from 'utils/toPersianNumbers/toPersianNumbers';

function ProfileFetchedData({profile}) {
  return (
    <div className='flex flex-row'>
      <div className="text-center  text-slate-600 font-semibold md:hidden flex pl-2 ">
        <span className="mdtext-sm text-[#000] ">
          {profile?.postcount && numberToPersian(profile.postcount)}
        </span>
        <span className="font-Vazirmatn mdtext-xs text-slate-500 font-[500] pr-1 ">
          پست
        </span>
      </div>
      <div className="text-center  text-slate-600 font-semibold">
        <span className="mdtext-sm text-[#000] font-Vazirmatn">
          {profile?.followercount && numberToPersian(profile?.followercount)}
        </span>
        <span className="font-Vazirmatn mdtext-xs text-slate-500 font-[500] pr-1">
          دنبال کنندگان
        </span>
      </div>
      <div className="text-center mr-4 text-slate-600 font-semibold">
        <span className="mdtext-sm text-[#000] font-Vazirmatn">
          {profile?.followingcount && numberToPersian(profile?.followingcount)}
        </span>
        <span className="font-Vazirmatn mdtext-xs text-slate-500 font-[500] pr-1">
          دنبال شوندگان
        </span>
      </div>
    </div>
  );
}

export default ProfileFetchedData
