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
import CreateOrders from "./pages/CreateOrders";
import GetAllOrders from "./pages/getAllOrders";
import GetAllOrdersModer from "./pages/GetAllOrdersModer";
import ExploreOrderModer from "./pages/ExploreOrderModer";
import ExploreOrder from "./pages/ExploreOrder";
import ShowOrderLogs from "./pages/ShowOrderLogs";
import ShowMyOrder from "./pages/ShowMyOrder";
import StartWorkOrder from "./pages/StartWorkOrder";
import GetAllOrdersSpecial from "./pages/GetAllOrdersSpecial";
import WatchWhatIDo from "./pages/WatchWhatIDo";
import FinishOrder from "./pages/finishOrder";
import RejectOrder from "./pages/RejectOrder";
import Portfolio from "./pages/Portfolio";
import SetNewPassword from "./pages/SetNewPassword";

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
                <Route path="/createOrder" element={<CreateOrders/>} />
                <Route path="/getAllOrders" element={<GetAllOrders/>} />
                <Route path="/getAllOrdersModer" element={<GetAllOrdersModer/>} />
                <Route path="/getAllOrdersSpecial" element={<GetAllOrdersSpecial/>} />
                <Route path="/exploreOrderModer/:order_id" element={<ExploreOrderModer/>} />
                <Route path="/exploreOrder/:order_id" element={<ExploreOrder/>} />
                <Route path="/showOrderLogs/:order_id" element={<ShowOrderLogs/>} />
                <Route path="/showMyOrder/:order_id" element={<ShowMyOrder/>} />
                <Route path="/startWorkOrder/:order_id" element={<StartWorkOrder/>} />
                <Route path="/watchWhatIDo" element={<WatchWhatIDo/>} />
                <Route path="/finishOrder/:order_id" element={<FinishOrder/>} />
                <Route path="/rejectOrder/:order_id" element={<RejectOrder/>} />
                <Route path="/portfolio" element={<Portfolio/>} />
                <Route path="/set_new_password" element={<SetNewPassword/>} />
            </Routes>
        </Router>
    );
}

export default App;
