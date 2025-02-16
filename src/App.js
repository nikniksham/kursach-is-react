import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetAllUsers from "./pages/GetAllUsers";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Authenticate from "./pages/Authenticate";
import TestGetFromAdminAndUser from "./pages/TestGetFromAdminAndUser";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/GetAllUsers" element={<GetAllUsers/>} />
                <Route path="/Register" element={<Register/>} />
                <Route path="/Authenticate" element={<Authenticate/>} />
                <Route path="/TestGetFromAdminAndUser" element={<TestGetFromAdminAndUser/>} />
            </Routes>
        </Router>
    );
}

export default App;
