import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, Typography } from "@mui/material";
import ProfileBrand from "assets/images/profilecard/ProfileBrand.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerProfile } from "store/Reducers/Users/UsersReducer";
import jwtDecode from "jwt-decode";
import { axiosPrivate } from "services/Private/axiosPrivate";

function ProfileCard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = jwtDecode(localStorage.getItem("authToken"));
  useEffect(() => {
    dispatch(fetchOwnerProfile(userData.user_id));
  }, []);
  const miniProfile = useSelector((state) => state.users.ownerUser);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const LogOutUser = async (e) => {
    localStorage.removeItem("authToken");
    
    try{
      const res =await axiosPrivate.post('/polls/logout/',{});
      console.log(res);
    }catch(err){
      console.log(err.message);
    }
    navigate("/login");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      
      {Object.keys(miniProfile).length > 0   && (
      <div className="flex flex-row mt-24 ">
        <div className="sm:pr-2" onClick={handleClick}>
          <img
            src={miniProfile.user_related_name?.image}
            className="rounded-full"
            style={{ height: "50px", width: "50px" }}
          />
        </div>
        <div className="flex flex-col pr-5 mt-3 lg:block md:hidden">
          <h3 className="text-xl">{miniProfile?.username}</h3>
        </div>
        <div className="pt-4 pl-5 lg:block md:hidden"></div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ py: 2, px: 3 }}>
            <Link to="/profile">Profile</Link>
          </Typography>
          <Typography sx={{ py: 2, px: 3 }}>
            <div className="hover:cursor-pointer" onClick={(e) => LogOutUser()}>
              Logout
            </div>
          </Typography>
        </Popover>
      </div>
      )}
    </>
  );
}

export { ProfileCard };
