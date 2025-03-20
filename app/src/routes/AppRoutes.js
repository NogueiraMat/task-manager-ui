import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";
import Login from "../pages/login/Login";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<PublicLayout />} >
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;