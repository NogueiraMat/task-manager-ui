import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkLogin } from "../slices/auth/authSlice";
import Container from "../components/layout/Container";

const PublicLayout = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        const verifyLogin = async () => {
            await dispatch(checkLogin())
        };
        verifyLogin();
    }, [dispatch]);

    if (user) {
        return <Navigate to="/tasks" />
    };

    return (
        <Container>
            <Outlet />
        </Container>
    );
};

export default PublicLayout;
