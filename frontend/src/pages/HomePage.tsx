/**
 * File: HomePage.tsx
 * Autor: Josef Susík <xsusik00>
 * Brief: Main page of the app
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../index.css";

function HomePage() {

    // Variables for displaying items
    var [all, setAll]:any = useState([]);
    var [favourites, setFavourites]:any = useState([]);
    var [beginners, setBeginners]:any = useState([]);

    // Async fetch all items
    const fetchAll = async () => {
        const response = await fetch('http://localhost:8000/listings/');
        const data = await response.json();
        console.log(data);
        setAll(data);
    }

    // Async fetch only favourite items
    const fetchFavourites = async () => {
        const response = await fetch('http://localhost:8000/listings/?favorite=true');
        const data = await response.json();
        console.log(data);
        setFavourites(data);
    }

    // Async fetch only items for beginners
    const fetchBeginner = async () => {
        const response = await fetch('http://localhost:8000/listings/?diff=Lehká');
        const data = await response.json();
        console.log(data);
        setBeginners(data);
    }
    
    // Call async fetches on page reload
    useEffect(() => {
        fetchAll();
        fetchFavourites();
        fetchBeginner();
        // if redirected to homepage, show from the top
        window.scrollTo(0, 0)
    },[]);


    // Show just first 4 items
    var display_all = all.slice(0,4);
    var display_favourites = favourites.slice(0,4);
    var display_beginners = beginners.slice(0,4);

    return (
        <div className="format homepage">
               <div className="homepage_all">
                <div className="hp_row_1">
                    <h3>Všechny inzeráty</h3>
                    <Link to="/all" className="hp_button_link"><button className="hp_button"><h3>Zobrazit všechny</h3></button></Link>
                </div>
                <div className="hp_row_2">
                {
                    display_all.map((item:any) =>
                        <Link to={"listing/" + item.id} className="inzerat_link" key={item.id} >
                        <div key={item.id} className="hp_inzerat">
                            <div className="hp_img_div">
                                <img src={item.mainImage.path} alt="" className="hp_img"/>
                            </div>
                            <p className="hp_title"><b>{item.title}</b></p>
                            <div className="hp_inzerat_detail_col">
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_cat">{item.category.name}</p>
                                    <p className="hp_place">{item.locationName}</p>
                                </div>
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_views">{item.size}</p>
                                    <p className="hp_price"><b>{item.price} czk</b></p>
                                </div>
                            </div>
                        </div>   
                        </Link>
                    )
                }  
                </div>
            </div>

            <div className="homepage_favourite">
                <div className="hp_row_1">
                    <h3>Oblíbené inzeráty</h3>
                    <Link to="/all" state={ {favorite_loc: "ano"} } className="hp_button_link"><button className="hp_button"><h3>Zobrazit všechny</h3></button></Link>
                </div>

                {(display_favourites.length === 0)?
                <div className="hp_row_2_no_fav">
                    <p>Nemáte žádné oblíbené inzeráty</p>
                </div>
                :
                <>
                <div className="hp_row_2">
                {
                    display_favourites.map((item:any) =>
                    <Link to={"listing/" + item.id} className="inzerat_link" key={item.id} >
                        <div key={item.id} className="hp_inzerat">
                            <div className="hp_img_div">
                                <img src={item.mainImage.path} alt="" className="hp_img"/>
                            </div>
                            <p className="hp_title"><b>{item.title}</b></p>
                            <div className="hp_inzerat_detail_col">
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_cat">{item.category.name}</p>
                                    <p className="hp_place">{item.locationName}</p>
                                </div>
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_views">{item.size}</p>
                                    <p className="hp_price"><b>{item.price} czk</b></p>
                                </div>
                            </div>
                        </div>   
                    </Link>
                    )
                }
                </div>
                </>
                }
            </div>

            <div className="homepage_beginner">
                <div className="hp_row_1">
                    <h3>Pro začátečníky</h3>
                    <Link to="/all" state={ {narocnost_loc: "Lehká"} }className="hp_button_link"><button className="hp_button"><h3>Zobrazit všechny</h3></button></Link>
                </div>
                <div className="hp_row_2">
                {
                    display_beginners.map((item:any) =>
                    <Link to={"listing/" + item.id} className="inzerat_link" key={item.id} >
                        <div key={item.id} className="hp_inzerat">
                            <div className="hp_img_div">
                                <img src={item.mainImage.path} alt="" className="hp_img"/>
                            </div>
                            <p className="hp_title"><b>{item.title}</b></p>
                            <div className="hp_inzerat_detail_col">
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_cat">{item.category.name}</p>
                                    <p className="hp_place">{item.locationName}</p>
                                </div>
                                <div className="hp_inzerat_detail_row">
                                    <p className="hp_views">{item.size}</p>
                                    <p className="hp_price"><b>{item.price} czk</b></p>
                                </div>
                            </div>
                        </div>   
                    </Link>    
                    )
                }             
                </div>
            </div>

         
        </div>
    );
}

export default HomePage;