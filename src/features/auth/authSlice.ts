import {createSlice} from '@reduxjs/toolkit'
import {authApi, User} from "../../app/services/auth";

interface InitialState {
    user: User & { token: string } | null;
    isAuthenticated: boolean;
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder: any) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state: any, action: any) => {
                state.user = action.payload
            })
    }
})

export const {logout} = slice.actions
export default slice.reducer