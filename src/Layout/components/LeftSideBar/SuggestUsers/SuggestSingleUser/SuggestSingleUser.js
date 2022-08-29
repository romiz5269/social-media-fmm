import ProfileImage from 'assets/images/userprofile/profile-image.webp'
import { Link } from 'react-router-dom';

function SuggestSingleUser() {
  return (
    <Link to='/user/mohammadreza'>
      <div className="grid grid-cols-5 hover:bg-slate-100 py-5 pl-5">
        <div className="col-span-4 flex flex-row pr-3">
          <img
            src={ProfileImage}
            style={{ width: "40px", height: "40px" }}
            className="rounded-full"
          />
          <span className="text-sm pr-3 pt-2 overflow-x-hidden text-ellipsis">
            MohammadReza
          </span>
        </div>
        <div className="col-span-1">
          <button className="text-xs px-3 py-2 bg-orange-500 text-white rounded-full shadow-md">
            Follow
          </button>
        </div>
      </div>
    </Link>
  );
}

export {SuggestSingleUser}
