import React from "react";
import "../index.css";

import Copyright from "@mui/icons-material/Copyright";

function Footer() {
    return (    
        <div className="footer">
            <div className="footer_main">
                <div className="copyright_div">
                    <Copyright className="copyright"/>
                    &nbsp;<p>2022 copyright</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;