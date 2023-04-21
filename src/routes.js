import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Lists from "./components/lists";

let Router = () =>  (
    <BrowserRouter> 
        <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/lists" element={<Lists/>} />
        </Routes>
    </BrowserRouter>
)

export default Router