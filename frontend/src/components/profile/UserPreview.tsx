/**
 * @file UserPreview.tsx
 * @author Rudolf Hyksa (xhyksa00@stud.fit.vutbr.cz)
 * @brief User Preview component containing their avatar, ratings
 * @version 0.1
 * @date 2022-12-14
 */

import "../../index.css";
import { Box, Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";

function UserPreview({ userId, userData, showLink=false, scale=1 }: any) {
  const d = new Date(userData.joinedOn)
    const joinedDate = d.toLocaleString('cs-CZ', {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    });
  return (
    <>
    {userData &&
      <>
        <Box sx={{ width: 1, height: 125 * scale,  minWidth: 500 }}>
          <div className="div_side_by_side">
            <Box sx={{ width: 125 * scale, }}>
              <Avatar
                alt={userData.name}
                src={"/avatars/" + userData.id + ".jpg"}
                sx={{ width: 125 * scale, height: 125 * scale, border: 1 }}
              />
            </Box>
            <Box sx={{ width: "auto", marginLeft: 2, marginTop: 1}}>
              <h1>{userData.name} {userData.surname}</h1>
              <h3>Členem od {joinedDate}</h3>
              <Box
                sx={{
                  height: 45 * scale,
                  width: "auto",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Rating name="user-star-rating" value={userData.averageRating?userData.averageRating:0} readOnly precision={0.1} size="large"/>
                <Box sx={{ ml: 2 }}>{userData.averageRating && Number((userData.averageRating).toFixed(2))}/5 ({userData.rating_ratee && userData.rating_ratee.length})</Box>
              </Box>
              {showLink ? <a href={"//localhost:3000/profile/" + userData.id + "/"}>Zobrazit profil</a> : <></>}
            </Box>
          </div>
        </Box>
      </>
    }
    </>
  );
}

export default UserPreview;