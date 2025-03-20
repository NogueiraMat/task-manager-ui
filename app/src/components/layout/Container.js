import React from "react";
import { 
    Flex
 } from '@chakra-ui/react'

const Container = ({ children, justifyContent="center", alignItems="center" }) => {
    return (
        <Flex
            bgColor="#232323"
            color="#fff"
            w="100%"
            h="100vh"
            overflowY="auto"
            justifyContent={justifyContent}
            alignItems={alignItems}
        >
            { children }
        </Flex>
    );
};

export default Container;
