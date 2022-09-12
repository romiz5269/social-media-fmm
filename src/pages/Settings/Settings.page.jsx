import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerProfile } from "store/Reducers/Users/UsersReducer";
import jwtDecode from "jwt-decode";
import { SettingForm } from "components";
import { axiosPrivate } from "services/Private/axiosPrivate";
import { URL } from "config/Urls/Urls.config";

function Settings() {
  const dispatch = useDispatch();
  const owner = jwtDecode(localStorage.getItem("authToken")).name;
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    try {
      axiosPrivate
        .get(`${URL.GETPROFILE}/${owner}`)
        .then((res) => setProfile(res.data));
    } catch (err) {
      console.log(err);
    }
  }, [owner]);

  return <>{profile && <SettingForm profile={profile} />}</>;
}

export { Settings };
