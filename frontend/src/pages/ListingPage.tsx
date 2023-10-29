/**
 * File: ListingPage.tsx
 * Author: Leopold Nemček <xnemce07>
 * Brief: Page for viewing a listing
 */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Grid2 from '@mui/material/Unstable_Grid2';
import { Container } from "@mui/system"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClassIcon from '@mui/icons-material/Class';
import WarningIcon from '@mui/icons-material/Warning'
import Globals from "../components/Globals";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UserPreview from "../components/profile/UserPreview";

import ImagePreview from "../components/ProductPage/ImagePreview";
import PropertiesDisplay from "../components/ProductPage/PropertiesDisplay";
import DiscussionSection from "../components/ProductPage/DiscussionSection";
import MessageIcon from '@mui/icons-material/Message';

function ListingPage() {


    let { id } = useParams();

    var [item, setItem]: any = useState([]);
    var [mainImg, setMainImg]: any = useState([]);


    /**
     * Fetch and deserialize item data
     */
    const handleFetchData = async () => {
        const response = await fetch('http://localhost:8000/listings/' + id + '/');
        const data = await response.json();
        setItem(data);
        setMainImg({ id: data.mainImage.id, path: data.mainImage.path })
    }

    /**
     * Send a PUT request to add item to favorites, then fetch data
     */
    const handleFavoriteClick = () => {
        const payload = { favoriteId: item.id }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }
        fetch(Globals.BACKEND_URL + 'listings/', requestOptions)
            .then(() => handleFetchData())
    }

    useEffect(() => {
        handleFetchData();
    }, []);


    /**
     * 
     * Function for changing selected image for viewing
     */
    const handleImageChange = (id: any, path: any) => {
        setMainImg({ id: id, path: path })
    }

    const i = 1;
    return (
        <>
            <div style={{ width: "80%", minWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
                <Grid2 container spacing={1} columns={10} columnSpacing={0}>
                    <Grid2 xs={1}>
                        {item && item.image_listing &&
                            item.image_listing.map((image: any) =>
                                <ImagePreview image={image} handle={handleImageChange} mainImgID={mainImg.id} />
                            )}

                    </Grid2>
                    <Grid2 md={4}>
                        <Container fixed style={{ width: "100%" }}>
                            <img src={mainImg.path} style={{ width: "100%", height: "100%" }} className="center" />
                        </Container>
                    </Grid2>
                    <Grid2 md={5}>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <h2>Starostlivost:</h2>
                        <p>{item.instructions ? item.instructions : 'Tento inzerat nemá žádné informace o starostlivosti.'}</p>
                    </Grid2>
                    <Grid2 xs={10}>
                        <h2>Informace</h2>
                    </Grid2>
                    <Grid2 xs={5}>
                        {item && item.image_listing &&
                            <PropertiesDisplay item={item} />
                        }
                    </Grid2>
                    <Grid2 md={5}>
                        {
                            item && item.author &&
                            <UserPreview userData={item.author} showLink={true} scale={0.7} />
                        }
                    </Grid2>
                    <Grid2 xs={10}>
                        <h2>Akce</h2>
                        {!item.isFavorite ?
                            <p onClick={handleFavoriteClick} style={{ cursor: "pointer", marginBottom: "0.2vw" }}><FavoriteBorderIcon />Přidat do oblíbených</p> :
                            <p onClick={handleFavoriteClick} style={{ cursor: "pointer", marginBottom: "0.2vw" }}><FavoriteIcon />Odebrat z oblíbených</p>
                        }
                        {/* These items don't do anythind, they're there for demonstration purposes */}
                        {item && item.author && Globals.CURRENT_USER_ID != item.author.id &&
                            <p style={{ cursor: "pointer", marginBottom: "0.2vw" }}><MessageIcon color='error' />Kontaktovat prodejce</p>
                        }
                        {item && item.author && Globals.CURRENT_USER_ID != item.author.id &&
                            <p style={{ cursor: "pointer", marginBottom: "0.2vw" }}><ClassIcon color='warning' />Nahlásit nesprávnou kategorii</p>
                        }
                        {
                            item && item.author && Globals.CURRENT_USER_ID != item.author.id &&
                            <p style={{ cursor: "pointer", marginBottom: "0.2vw" }}><WarningIcon color='error' />Nahlásit inzerát</p>
                        }
                        {item && item.author && Globals.CURRENT_USER_ID == item.author.id &&
                            <p style={{ cursor: "pointer", marginBottom: "0.2vw" }}><DeleteForeverIcon color='error' />Smazat inzerát</p>
                        }
                    </Grid2>
                </Grid2>
                <div style={{ padding: "2vw" }} />
                <h2>Diskuze</h2>
                {item && item.image_listing &&
                    <DiscussionSection OpId={item.author.id} comments={item.comment_listing} fetchData={handleFetchData} listingID={item.id} />
                }
            </div>
        </>
    );
}

export default ListingPage;