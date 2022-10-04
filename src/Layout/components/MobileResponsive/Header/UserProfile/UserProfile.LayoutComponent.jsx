import { useState } from "react";
import ProfileBrand from "assets/images/profilecard/ProfileBrand.jpg";
import { Popover, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function UserProfile() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <img
        src={ProfileBrand}
        style={{ height: "55px", width: "55px" }}
        className="rounded-full  border-2"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      />
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
        <Typography sx={{ py: 2, px: 3 }}>Logout</Typography>
      </Popover>
    </>
  );
}

export { UserProfile };
