/**
 * @file ProfileView.tsx
 * @author Rudolf Hyksa (xhyksa00@stud.fit.vutbr.cz)
 * @brief Combines user previews with additional profile inforamtion
 * @version 0.1
 * @date 2022-12-14
 */

import React , { useState, useEffect } from "react";
import "../../index.css";
import UserPreview from "./UserPreview";
import WarningIcon from "@mui/icons-material/Warning"
import ClassIcon from "@mui/icons-material/Class"
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Globals from "../Globals";

function ProfileView({ userData, fetchData }: any) {

    const handleFavoriteClick = () => {
        const payload = { favoriteId: userData.id }
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }
        fetch(Globals.BACKEND_URL + "users/", requestOptions)
            .then(() => fetchData())
    }

    return (
        <>
            <div className="profile_preview" style={{ marginBottom: "10px" }}>
                <UserPreview userId={userData.id} userData={userData} />
            </div>
            <div className="profile_main">
                {!userData.isFavorite ?
                    <p onClick={handleFavoriteClick} style={{cursor: "pointer"}}><FavoriteBorderIcon/>Přidat do oblíbených</p> :
                    <p onClick={handleFavoriteClick} style={{cursor: "pointer"}}><FavoriteIcon/>Odebrat z oblíbených</p>
                }
                <p style={{cursor: "pointer"}}><ClassIcon color="warning" />Zobrazit kontakt</p>
                <p style={{cursor: "pointer"}}><WarningIcon color="error" />Nahlásit užívatele</p>
            </div>
        </>
    );
}

export default ProfileView;