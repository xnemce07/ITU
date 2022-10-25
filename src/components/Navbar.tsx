import React from "react";
import "../index.css"
import { Link } from "react-router-dom"

function Navbar() {
    return(
        <div>
            <div className="navbar">
            <div className="navbar_left">
                <li>
                    <Link to="/" className="link">Homepage</Link>
                </li>
            </div>
            <div className="navbar_right">
                <li>
                    <Link to="/profile" className="link">profile</Link>
                </li>
            </div>
        </div>
        </div>
    );
}

export default Navbar;