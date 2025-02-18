import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetAllUsers from "./pages/GetAllUsers";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TestGetFromAdminAndUser from "./pages/TestGetFromAdminAndUser";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import MakeApplication from "./pages/MakeApplication";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/getAllUsers" element={<GetAllUsers/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/test" element={<TestGetFromAdminAndUser/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/makeApplication" element={<MakeApplication/>} />
            </Routes>
        </Router>
    );
}

export default App;
