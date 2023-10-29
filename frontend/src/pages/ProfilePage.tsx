/**
 * @file ProfilePage.tsx
 * @author Rudolf Hyksa (xhyksa00@stud.fit.vutbr.cz)
 * @brief Handles fetching user data and rendering profile pages
 * @version 0.1
 * @date 2022-12-14
 */

import React, { useEffect, useState } from "react";
import ProfileView from "../components/profile/ProfileView";
import ProfileTabs from "../components/profile/ProfileTabs";
import { Link, useParams } from "react-router-dom";

function ProfilePage() {
  let { userId } = useParams();

  var [userData, setUserData]: any = useState([]);

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/users/" + userId + "/");
    const data = await response.json();
    // const data = await response.json();
    console.log("ProfilePage fetchUserData");
    console.log(data);
    setUserData(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  var userListings = userData.listing_author;
  var userRatings = userData.rating_ratee;

  return (
    <div className="format profilepage">
      <div className="profilepage_user_info">
        <ProfileView userId={userId} userData={userData} fetchData={fetchUserData} />
      </div>
      <div className="profilepage_tabs">
        <ProfileTabs userListings={userListings} userRatings={userRatings} userId={userId} fetchData={fetchUserData}/>
      </div>
    </div>
  );
}

export default ProfilePage;
