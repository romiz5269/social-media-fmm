import { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import ProfileBrand from "assets/images/profilecard/ProfileBrand.jpg";
import { Popover, Typography } from "@mui/material";

function NotificationButton() {
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
      <FaRegBell
        className="mt-3 text-xl"
        src={ProfileBrand}
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
          horizontal: "center",
        }}
      >
        <Typography sx={{ py: 2, px: 1 }}>First Notif</Typography>
      </Popover>
    </>
  );
}

export { NotificationButton };
