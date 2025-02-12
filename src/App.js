import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetAllUsers from "./pages/GetAllUsers";
import Home from "./pages/Home";
import CreateUserForm from "./pages/CreateUser";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/GetAllUsers" element={<GetAllUsers/>} />
                <Route path="/CreateUser" element={<CreateUserForm/>} />
            </Routes>
        </Router>
    );
}

export default App;
