import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LoginBodyBackground from "assets/images/Login/body-background-3.webp";
import { useDispatch } from "react-redux";
import {
  updateUserData,
  updateUserImage,
} from "store/Reducers/Users/UsersReducer";
import { useNavigate } from "react-router-dom";
import SettingTopbar from "../SettingTopbar/SettingTopbar.component";
import SettingProfileImage from "../SettingProfileImage/SettingProfileImage.component";
import SettingPersonalInfo from "../SettingPersonalInfo/SettingPersonalInfo.component";
import SettingPrivacy from "../SettingPrivacy/SettingPrivacy.component";
import SettingTheme from "../SettingTheme/SettingTheme.component";
import SaveChanges from "../SaveChanges/SaveChanges.component";

import MultiRangeSlider from "multi-range-slider-react";

const LoginStyle = {
  backgroundImage: `url(${LoginBodyBackground})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "100vh",
};
const SettingForm = ({ profile }) => {
  // console.log(profile);

  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [previewSrc, setPrewviewSrc] = useState(profile?.myimage);
  const [editable, setEditable] = useState(false);

  // Profile section states
  const [username, setUsername] = useState(profile?.username);
  const [email, setEmail] = useState(profile?.email);

  const [bio, setBio] = useState(profile?.bio);
  const [birthdate, setBirthDate] = useState(profile?.birh_date);
  const [image, setImage] = useState(profile?.myimage);
  const [showSaveChanges, setShowSaveChanges] = useState(false);
  const [whatsChanged, setWhatsChanged] = useState(null);

  //privacy section states
  const [checkPrivatePage, setCheckPrivatePage] = useState(false);

  //theme section states
  const [defaultTheme, setDefaultTheme] = useState(
    localStorage.getItem("color-theme") ? true : false
  );
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("color-theme") ? true : false
  );
  const [themeColor, setThemeColor] = useState(null);

  const previewFile = () => {
    var preview = document.querySelector("img");
    var file = document.querySelector("input[type=file]").files[0];
    setImage(file);
    preview.src = URL.createObjectURL(file);
    setPrewviewSrc(preview.src);
  };

  const profileImage = () => {
    document.getElementById("profile-image-upload").click();
  };

  useEffect(() => {
    setWhatsChanged(null);
    if (username !== "" || bio !== "" || image !== null) {
      if (
        username !== profile.username ||
        bio !== profile.bio ||
        previewSrc !== profile?.image
      ) {
        setWhatsChanged("profile");
        setShowSaveChanges(true);
      } else {
        setWhatsChanged(null);
        setShowSaveChanges(false);
      }
    } else {
      setWhatsChanged(null);
      setShowSaveChanges(false);
    }
  }, [username, bio, image]);

  useEffect(() => {
    if (checkPrivatePage) {
      setShowSaveChanges(true);
      setWhatsChanged("privacy");
    } else {
      setShowSaveChanges(false);
      setWhatsChanged(null);
    }
  }, [checkPrivatePage]);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
      document.body.style.backgroundColor = "#0f1419";
    }
    if (!darkTheme) {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("color-theme");
      document.body.style.backgroundColor = "white";
    }
    if (themeColor !== null) {
      setShowSaveChanges(true);
      setWhatsChanged("theme");
    } else {
      setShowSaveChanges(false);
      setWhatsChanged(null);
    }
  }, [darkTheme, themeColor]);
  const formDataBody = new FormData();
  const handleImageUploading = (e) => {
    e.preventDefault();
    formDataBody.append("image", image);
    dispatch(
      updateUserImage({
        formDataBody,
        username: profile?.username,
      })
    );
    setEditable(false);
  };
  const handleSaveChanges = (e, changedName) => {
    if (changedName === "profile") {
      console.log(bio);
      // formDataBody.append("username", username);
      // formDataBody.append("bio", bio);
      // dispatch(updateUserData(formDataBody))
      dispatch(
        updateUserData({
          orgusername: profile?.username,
          username: username,
          bio: bio,
          myimage: image,
        })
      );
    }
    if (changedName === "theme") {
      if (darkTheme) {
        localStorage.setItem("color-theme", "dark");
      } else {
        localStorage.removeItem("color-theme");
      }
    }
    setShowSaveChanges(false);
    setWhatsChanged(null);
  };
  const handleCancelChanges = (e, changedName) => {
    if (changedName === "profile") {
      setUsername(profile.username);
      setEmail(profile.email);
      setBio(profile.bio);
      setEditable(false);
      setImage(null);
      setPrewviewSrc(profile?.image);
    }

    if (changedName === "privacy") {
      setCheckPrivatePage(false);
    }

    if (changedName === "theme") {
      setDarkTheme(false);
      setThemeColor(null);
    }
  };
  const handleCancelUploadNewImage = () => {
    setEditable(false);
    setImage(null);
    setPrewviewSrc(profile?.image);
  };
  return (
    <section
      className="form-section flex flex-col items-center justify-center sm:flex-col pt-0 relative sm:w-[100%]"
      style={LoginStyle}
    >
      {profile && (
        <div
          className="flex flex-col shadow-2xl mx-auto lg:w-2/6 md:w-3/6 sm:w-4/6 w-full bg-white px-0 overflow-y-auto "
          style={
            darkTheme
              ? { height: "700px", backgroundColor: "#2f3136" }
              : { height: "700px" }
          }
        >
          <SettingTopbar darkTheme={darkTheme} Navigate={Navigate} />

          <div style={{ direction: "ltr" }}>
            <MultiRangeSlider
              baseClassName="multi-range-slider"
              thumbRightColor="#005ADC"
              thumbLeftColor="#005ADC"
              min={0}
              max={100}
              step={5}
              ruler={false}
              minValue={minValue}
              maxValue={maxValue}
              onInput={(e) => {
                handleInput(e);
              }}
            />
          </div>
          <SettingProfileImage
            handleImageUploading={handleImageUploading}
            whatsChanged={whatsChanged}
            editable={editable}
            previewSrc={previewSrc}
            setEditable={setEditable}
            profile={profile}
            profileImage={profileImage}
            previewFile={previewFile}
            handleCancelUploadNewImage={handleCancelUploadNewImage}
          />

          <SettingPersonalInfo
            username={username}
            setUsername={setUsername}
            bio={bio}
            setBio={setBio}
            email={email}
            birthdate={birthdate}
            setBirthDate={setBirthDate}
          />
          <SettingPrivacy
            whatsChanged={whatsChanged}
            darkTheme={darkTheme}
            checkPrivatePage={checkPrivatePage}
            setCheckPrivatePage={setCheckPrivatePage}
          />

          <SettingTheme
            darkTheme={darkTheme}
            setDarkTheme={setDarkTheme}
            themeColor={themeColor}
            setThemeColor={setThemeColor}
            whatsChanged={whatsChanged}
          />
        </div>
      )}
      <SaveChanges
        showSaveChanges={showSaveChanges}
        whatsChanged={whatsChanged}
        handleCancelChanges={handleCancelChanges}
        handleSaveChanges={handleSaveChanges}
      />
    </section>
  );
};

export { SettingForm };
