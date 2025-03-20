import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
    Flex, 
    Text, 
    Input, 
    Button, 
    Divider, 
    Spinner
} from "@chakra-ui/react";

import { login } from "../../slices/auth/authSlice"

const FormElement = ({ description, name, value, handleSetLoginForm, type = "text" }) => {
    return (
        <Flex flexDir="column" gap={2} w="100%">
            <Text fontSize="md" fontWeight="bold" color="gray.300">{description}</Text>
            <Input
                name={name}
                type={type}
                value={value || ""}
                onChange={(e) => handleSetLoginForm(e)}
                focusBorderColor="teal.400"
                borderRadius={6}
                h={12}
                fontSize="md"
                bg="gray.700"
                color="white"
                _placeholder={{ color: "gray.400" }}
            />
        </Flex>
    );
};

const Login = () => {
    const dispatch = useDispatch();
    const { loading }= useSelector((state) => state.auth)

    const [loginForm, setLoginForm] = useState({ username: "", password: "" });

    const handleSetLoginForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(login(loginForm));
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <Flex
            w={{ base: "90%", sm: "70%", md: "50%", lg: "40%", xl: "30%" }}
            minH={{ base: "60vh", md: "50vh" }}
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            bg="gray.800"
            borderRadius={10}
            p={8}
            gap={6}
            boxShadow="lg"
        >
            <Text fontSize="2xl" fontWeight="bold" color="teal.300">Faça o login...</Text>
            <Divider color="teal.600"/>
            <FormElement description="Usuário" name="username" value={loginForm.username} handleSetLoginForm={handleSetLoginForm} />
            <FormElement description="Senha" name="password" type="password" value={loginForm.password} handleSetLoginForm={handleSetLoginForm} />
            <Button 
                colorScheme="teal"
                w="full"
                h={12}
                fontSize="lg"
                fontWeight="bold"
                onClick={(e) => handleLogin(e)}
            >
                { loading ? <Spinner /> : "Entrar" }
            </Button>
        </Flex>
    );
};

export default Login;