import React from "react";
import "./style.css"

import { BsX } from "react-icons/bs";
import { Functions, lists } from "../class";

document.addEventListener('DOMContentLoaded', () => {
    Functions.getLists()
})

let Default = () => {
    return (
        <div className="content-default" id="content-default">
            <div className="modal" id="modal">
                <div className="menu">
                    <BsX id="cancel-modal" onClick={Functions.cancelModal} />
                    <input type="text" name="name-list" id="name-list" className="name-list" placeholder="DIGITE O NOME DA LISTA" autoComplete="off" />
                    <button onClick={Functions.generateNewList}>CRIAR</button>
                </div>
            </div>
            <div className="left">
                <div className="actions">
                    <button className="btn" id="new-list" onClick={Functions.addNewList}>CRIAR NOVA LISTA</button>
                </div>
            </div>
            <div className="right">
                <div className="title">
                    <span>LISTAS SALVAS</span>
                </div>
                <div className="empty" id="empty">NÃO HÁ LISTAS SALVAS!</div>
                <ul className="lists" id="lists">
                    {lists.map((element, index) =>
                        <button className="list" key={index} onClick={Functions.openList}>{element.name}</button>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Default