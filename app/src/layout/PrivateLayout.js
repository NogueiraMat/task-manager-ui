import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from "@chakra-ui/react";

import { checkLogin } from "../slices/auth/authSlice";
import Container from "../components/layout/Container";

const PrivateLayout = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyLogin = async () => {
            await dispatch(checkLogin());
            setLoading(false);
        };
        verifyLogin();
    }, [dispatch]);

    if (loading) {
        return (
            <Container justifyContent="center" alignItems="center">
                <Spinner />
            </Container>
            
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <Container alignItems="start">
            <Outlet />
        </Container>
    );
};


export default PrivateLayout;