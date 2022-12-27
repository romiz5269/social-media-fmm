import React, { useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerProfile } from "store/Reducers/Users/UsersReducer";
import jwtDecode from "jwt-decode";
import { SettingForm } from "components";

function Settings() {
  const dispatch = useDispatch();
  const owner = jwtDecode(localStorage.getItem("authToken")).name;
  useEffect(() => {
    dispatch(fetchOwnerProfile(owner));
   
  }, [owner]);
  const profile = useSelector((state) => state.users.ownerUser);
  console.log("profile before : ", profile);
  return (
    <>{Object.keys(profile).length > 0 && <SettingForm profile={profile} />}</>
  );
}

export { Settings };
