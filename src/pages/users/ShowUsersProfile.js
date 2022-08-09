import ProfileImage from "assets/images/userprofile/profile-image.webp";
import { useState } from "react";
import { FaCalendar, FaClipboard, FaStickyNote, FaUser } from "react-icons/fa";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AllBlogsById, SingleBlog } from "components";
import { Products } from "pages/products/Products";
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

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <div>
      <div
        className="flex flex-col relative bg-orange-400 sm:mt-0 mt-20 sm:mb-0 mb-12"
        style={{ height: "150px" }}
      >
        <div className="absolute object-fill bottom-0 top-16 right-12">
          <img
            src={ProfileImage}
            className="rounded-full border-8 border-white"
            style={{ height: "140px", width: "140px" }}
          />
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-12 mt-16">
        <div className="sm:col-span-6 flex flex-col text-left pl-3">
          <div className="flex flex-row">
            <FaUser className="text-xs text-slate-500 mt-2 mr-2" />
            <span className="text-xl font-semibold pr-2">Mohammadreza</span>
          </div>
          <div className="flex flex-row py-2">
            <FaCalendar className="text-xs text-slate-500 mt-2 mr-2" />
            <span className="text-sm mt-1 pr-2">22 july 2022</span>
          </div>
          <div className="flex flex-row">
            <FaStickyNote className="text-xs text-slate-500 mt-2 mr-2" />
            <span className="text-sm pr-2 text-slate-700 mt-1 w-2/4 sm:w-4/5">
              my name is Mohammadreza and im full stack web developer
            </span>
          </div>
        </div>
        <div className="sm:col-span-6 p-5">
          <div className="bg-slate-300 rounded-md flex flex-col">
            <div className="flex flex-row justify-evenly py-2">
              <div className="text-center flex flex-col text-slate-600 font-semibold">
                <span className="font-Vazirmatn text-xs">پست ها</span>
                <span className="text-sm">150</span>
              </div>
              <div className="text-center flex flex-col text-slate-600 font-semibold">
                <span className="font-Vazirmatn text-xs">دنبال کنندگان</span>
                <span className="text-sm">250</span>
              </div>
              <div className="text-center flex flex-col text-slate-600 font-semibold">
                <span className="font-Vazirmatn text-xs">دنبال شوندگان</span>
                <span className="text-sm">2k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-row justify-center sm:mb-0 mb-10">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="flex flex-row justify-center">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example" 
              
            >
              <Tab  label="بلاگ ها" {...a11yProps(0)} />
              <Tab label="محصولات" {...a11yProps(1)} />
              <Tab label="لایک ها" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AllBlogsById />
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
