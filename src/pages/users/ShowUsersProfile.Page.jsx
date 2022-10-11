import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerProfile } from "store/Reducers/Users/UsersReducer";
import useCheckThemeMode from "hooks/useCheckThemeMode.hook";
import { AllBlogsById, AllOwnerBlogs, ProfileData } from "components";
import { Products } from "pages";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import jwtDecode from "jwt-decode";
import { BiLock } from "react-icons/bi";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ShowUsersProfile() {
  const [value, setValue] = useState(0);
  const { name } = useParams();
  const { theme } = useCheckThemeMode();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const owner = jwtDecode(localStorage.getItem("authToken")).name;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (name === owner) {
      Navigate("/profile", { replace: true });
    } else {
      dispatch(fetchOwnerProfile(name));
    }
  }, [name, owner]);

  const profile = useSelector((state) => state.users.ownerUser);
  const hasFollow = useSelector((state) => state.users.hasFollowThreadUser);
  console.log(hasFollow);
  return (
    <div>
      <ProfileData
        profile={profile}
        // hasFollowButton={true}
        // hasEditButton={false}
      />
      <div className="mt-5 flex flex-row justify-center sm:mb-0 mb-10">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
            className="flex flex-row justify-between "
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={
                  theme
                    ? {
                        fontFamily: "Vazirmatn",
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#fff",
                      }
                    : {
                        fontFamily: "Vazirmatn",
                        fontWeight: "600",
                        fontSize: "14px",
                      }
                }
                label="بلاگ ها"
                {...a11yProps(0)}
              />
              <Tab
                sx={
                  theme
                    ? {
                        fontFamily: "Vazirmatn",
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#fff",
                      }
                    : {
                        fontFamily: "Vazirmatn",
                        fontWeight: "600",
                        fontSize: "14px",
                      }
                }
                label="محصولات"
                {...a11yProps(1)}
              />
              <Tab
                sx={
                  theme
                    ? {
                        fontFamily: "Vazirmatn",
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#fff",
                      }
                    : {
                        fontFamily: "Vazirmatn",
                        fontWeight: "600",
                        fontSize: "14px",
                      }
                }
                label="لایک ها"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} className="min-h-[300px]">
            {hasFollow ? (
              <AllOwnerBlogs  />
            ) : (
              <div className="flex flex-col justify-center items-center">
                <BiLock className="text-9xl  text-slate-400 w-[60px] h-[60px]" />
                <span className="text-slate-500 py-8 text-lg">
                  You can't see posts of this page , you should follow this
                </span>
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Products />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export { ShowUsersProfile };
