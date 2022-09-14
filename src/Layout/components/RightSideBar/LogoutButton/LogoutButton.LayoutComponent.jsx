import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, Typography } from "@mui/material";
import ProfileBrand from "assets/images/profilecard/ProfileBrand.jpg";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerProfile } from "store/Reducers/Users/UsersReducer";
import jwtDecode from "jwt-decode";
import { axiosPrivate } from "services/Private/axiosPrivate";
import { BiLogOutCircle } from "react-icons/bi";

function LogoutButton
() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = jwtDecode(localStorage.getItem("authToken"));
  useEffect(() => {
    dispatch(fetchOwnerProfile(userData.name));
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
      const res =await axiosPrivate.post('/login/logout/',{});
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
      <button className="bg-gradient-to-r from-red-700 to-red-500 font-Vazirmatn hidden lg:block md:hidden mt-2 py-3 px-16 text-sm font-semibold text-white rounded-full shadow-xl ">
        Logout
      </button>
      <button className="md:block lg:hidden fixed bg-gradient-to-r from-red-700 to-red-500 sm:mt-20 mt-2 py-3 px-3 text-sm font-semibold text-white rounded-full shadow-xl ">
        <BiLogOutCircle className="text-lg" />
      </button>
    </>
  );
}

export { LogoutButton
 };
