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
import ShowMyApplication from "./pages/ShowMyApplication";
import GetAllApplications from "./pages/GetAllApplications";
import AdminPanel from "./pages/AdminPanel";
import ShowApplicationLogs from "./pages/ShowApplicationLogs";
import ManageApplication from "./pages/ManageApplication";

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
                <Route path="/showMyApplication/:application_id" element={<ShowMyApplication/>} />
                <Route path="/getAllApplications" element={<GetAllApplications/>} />
                <Route path="/adminPanel" element={<AdminPanel/>} />
                <Route path="/showApplicationLogs/:application_id" element={<ShowApplicationLogs/>} />
                <Route path="/manageApplication/:application_id" element={<ManageApplication/>} />
            </Routes>
        </Router>
    );
}

export default App;
