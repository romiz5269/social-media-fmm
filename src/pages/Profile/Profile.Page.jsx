import React,{ useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { BlogLoader } from "components";
import { Products } from "pages/products/Products.Page";
import { ProfileData } from "components";
import { fetchOwnerProfile } from "store/Reducers/Users/UsersReducer";
import jwtDecode from "jwt-decode";
import useCheckThemeMode from "hooks/useCheckThemeMode.hook";
import { Suspense } from "react";

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
        <Box  >
          <Typography >{children}</Typography>
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
function Profile() {
  const ProfileBlogs  = React.lazy(()=>import('components/Blogs/AllOwnerBlogs/AllOwnerBlogs.component'))
  const [value, setValue] = useState(0);
  const {theme} = useCheckThemeMode()
  const userData = jwtDecode(localStorage.getItem("authToken")).name;
  const dispatch = useDispatch();
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchOwnerProfile(userData));
  }, []);

  const profile = useSelector((state) => state.users.ownerUser);
  


  
  return (
    <div>
      <ProfileData profile={profile} />
      <div className="mt-5 flex flex-row justify-between  sm:mb-0 mb-10">
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
          <TabPanel value={value} index={0}>
            <Suspense fallback={<BlogLoader />}>
              <ProfileBlogs />
            </Suspense>
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

export { Profile };
