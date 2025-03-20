import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await api.post('/authentication', { username, password });

            const { username: responseUsername, first_name, last_name } = response;

            localStorage.setItem('username', responseUsername);
            localStorage.setItem('first_name', first_name);
            localStorage.setItem('last_name', last_name);

            return response;
        } catch (error) {
            localStorage.removeItem('username');
            localStorage.removeItem('first_name');
            localStorage.removeItem('last_name');
            return rejectWithValue(error.message || "Erro desconhecido");
        };
    }
);

export const checkLogin = createAsyncThunk(
    'auth/checkLogin',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/user');

            const { username: responseUsername, first_name, last_name, created_at } = response;
            
            localStorage.setItem('username', responseUsername);
            localStorage.setItem('first_name', first_name);
            localStorage.setItem('last_name', last_name);
            localStorage.setItem('created_at', created_at);

            return response;

        } catch (error) {
            return rejectWithValue(error.message || "Erro desconhecido");
        };
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            .addCase(checkLogin.pending, (state) => {
                state.error = null;
            })
            .addCase(checkLogin.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(checkLogin.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;