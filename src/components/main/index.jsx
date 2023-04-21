import React from "react";
import "./style.css"

import Default from "../default";
import Title from "../title";

let Main = () => {
    return (
        <div className="container">
            <Title/>
            <Default />
        </div>
    );
}

export default Main