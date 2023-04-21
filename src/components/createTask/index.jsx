import React from "react";
import "./style.css"

import { Functions } from "../class";
import { BsPlus } from "react-icons/bs";

let CreateTask = () => {
    return (
        <div className="create-task">
            <input type="text" name="name-task" id="name-task" className="name-task" autoComplete="off"/>
            <button className="btn-create-task" id="btn-create-task" onClick={Functions.createTask}><BsPlus /></button>
        </div>
    )
}

export default CreateTask