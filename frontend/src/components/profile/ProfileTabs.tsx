/**
 * @file ProfileTabs.tsx
 * @author Rudolf Hyksa (xhyksa00@stud.fit.vutbr.cz)
 * @brief Component dealing with Listing and Rating Tabs in a user's profile page
 * @version 0.1
 * @date 2022-12-14
 */

import * as React from "react";
import "../../index.css";
import Globals from "../Globals";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import UserRatings from "./UserRatings";

function TabPanel(props: any) {
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

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


function ProfileTabs({ userListings, userRatings, userId, fetchData }: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          // sx={{
          //   color: '#046A1A'
          // }}
          TabIndicatorProps={{
            sx: { backgroundColor: Globals.COLORS.MAIN },
          }}
        >
          <Tab label="INZERÁTY" {...a11yProps(0)} />
          <Tab label="RECENZE" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* LISTINGS */}
      <TabPanel value={value} index={0}>
        <div className="f_a_b_display">
          {userListings &&
            userListings.map((item: any) => (
              <Link to={"../listing/" + item.id} className="inzerat_link">
                <div key={item.id} className="hp_inzerat">
                  <div className="hp_img_div">
                    <img src={item.mainImage.path} alt="" className="hp_img" />
                  </div>
                  <p className="hp_title">
                    <b>{item.title}</b>
                  </p>
                  <div className="hp_inzerat_detail_col">
                    <div className="hp_inzerat_detail_row">
                      <p className="hp_cat">{item.category.name}</p>
                      <p className="hp_place">{item.locationName}</p>
                    </div>
                    <div className="hp_inzerat_detail_row">
                      <p className="hp_views">{item.size}</p>
                      <p className="hp_price">
                        <b>{item.price} czk</b>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </TabPanel>
      {/* RATINGS */}
      <TabPanel value={value} index={1}>
        <UserRatings userRatings={userRatings} userId={userId} fetchData={fetchData}/>
      </TabPanel>
    </Box>
  );
}

export default ProfileTabs;
