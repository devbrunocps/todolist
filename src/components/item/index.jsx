import React from "react"
import "./style.css"

import { Functions } from "../class";

let Item = (props) => {

    if (props.done == false) {
        return (
            <li className="item" key={props.index} >
                <div className="checkbox">
                    <input type="checkbox" name="check" className="check" onClick={Functions.checkTask} />
                </div>
                <div className="task">{props.nameTask}</div>
                <div className="actions">
                    <div className="change"><i className="bi bi-pencil-fill" onClick={Functions.openChangeTask}></i></div>
                    <div className="delete"><i className="bi bi-trash3-fill" onClick={Functions.deleteTask}></i></div>
                </div>
            </li>
        )
    } else if (props.done == true) {
        return (
            <li className="item" key={props.index} >
                <div className="checkbox">
                    <input type="checkbox" name="check" className="check" onClick={Functions.checkTask} defaultChecked />
                </div>
                <div className="task" style={{ textDecoration: "line-through", color: "gray" }}>{props.nameTask}</div>
                <div className="actions">
                    <div className="change"><i className="bi bi-pencil-fill" onClick={Functions.openChangeTask}></i></div>
                    <div className="delete"><i className="bi bi-trash3-fill" onClick={Functions.deleteTask}></i></div>
                </div>
            </li>
        )
    }
}

export default Item