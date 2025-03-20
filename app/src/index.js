import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import './index.css';
import AppRoutes from './routes/AppRoutes';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <Provider store={store}>
        <   AppRoutes />
        </Provider>
    </ChakraProvider>
);

