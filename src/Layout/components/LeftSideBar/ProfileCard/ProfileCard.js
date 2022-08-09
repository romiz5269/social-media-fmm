import { Popover, Typography } from "@mui/material";
import ProfileBrand from "assets/images/profilecard/ProfileBrand.jpg";
import AuthContext from "Context/AuthContext/AuthContext.auth";
import { useContext, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
function ProfileCard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const LogOutUser = () => {
    setAuth({});
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="flex flex-row mt-24 ">
      <div className="sm:pr-2" onClick={handleClick}>
        <img
          src={ProfileBrand}
          className="rounded-full"
          style={{ height: "50px", width: "50px" }}
        />
      </div>
      <div className="flex flex-col pr-5 mt-3 lg:block md:hidden">
        <h3 className="text-xl">John Doe</h3>
      </div>
      <div className="pt-4 pl-5 lg:block md:hidden">
        {/* <FaEllipsisV className="text-slate-600" /> */}
      </div>
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
          <div className="hover:cursor-pointer" onClick={() => LogOutUser()}>
            Logout
          </div>
        </Typography>
      </Popover>
    </div>
  );
}

export { ProfileCard };
