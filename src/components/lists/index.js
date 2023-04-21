import React from "react";
import "./style.css"
import { Functions, lists, tasksAmount, dones, countTasksDone } from "../class";

import { BsX, BsArrowUpShort, BsFillTrash3Fill } from "react-icons/bs";

import Title from "../title";
import Item from "../item";
import CreateTask from "../createTask";

document.addEventListener('DOMContentLoaded', countTasksDone)
document.addEventListener('scroll', () => {
    Functions.checkScroll()
})

let Lists = () => {
    let firstListCreated = lists[0]

    return (
        <div className="container">
            <div className="modal" id="modal-change">
                <div className="menu">
                    <BsX id="cancel-modal" onClick={Functions.cancelModal} />
                    <input type="text" name="change-task" id="change-task" className="change-task" placeholder="" autoComplete="off" />
                    <button onClick={Functions.changeTask}>SALVAR</button>
                </div>
            </div>
            <div className="modal" id="modal-delete">
                <div className="menu" id="menu-delete">
                    <div className="confirm"><span> DESEJA EXCLUIR ESSA LISTA?</span></div>
                    <div className="btns">
                        <button onClick={Functions.cancelModal}><span>CANCELAR</span></button>
                        <button onClick={Functions.deleteList}><span>CONFIRMAR</span></button>
                    </div>
                </div>
            </div>
            <Title />
            <div className="content-lists">
                <div className="icons">
                    <BsFillTrash3Fill className="delete-list" id="delete-list" onClick={Functions.openDeleteList} />
                    <BsX className="close-list" onClick={Functions.closeList} />
                </div>
                <div className="name-list" id="name-list">{firstListCreated.name}</div>
                <div className="checks" id="count-checks">{dones + tasksAmount}</div>
                <ul className="tasks" id="tasks">
                    {firstListCreated.tasks.map((element, index) =>
                        <Item nameTask={element.name} done={element.done} key={index + 1} />
                    )}
                </ul>
                <CreateTask />
            </div>
            <div className="click-to-top" id="click-to-top" onClick={Functions.windowToTop}>
                <div className="btn-to-top">
                    <BsArrowUpShort id="icon-to-top" />
                </div>
            </div>
        </div>
    )
}

export default Lists