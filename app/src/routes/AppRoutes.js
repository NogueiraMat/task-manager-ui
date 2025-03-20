import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import PrivateLayout from "../layout/PrivateLayout";
import PublicLayout from "../layout/PublicLayout";

import Login from "../pages/login/Login";
import Tasks from "../pages/tasks/tasks";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PublicLayout />} >
                    <Route path="/" element={<Navigate to="/login"/>} />
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<PrivateLayout />}>
                    <Route path="/tasks" element={<Tasks />}/>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
