import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authApi} from "../../app/services/auth";

interface InitialState {
    user: { username: string, token: string } | null;
}

const initialState: InitialState = {
    user: null,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
        addUsername: (state, action: PayloadAction<string>) => {
            if (state.user !== null) {
                state.user.username = action.payload
            }
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state: any, action: any) => {
                state.user = action.payload
            })
    }
})

export const {logout, addUsername} = slice.actions
export default slice.reducer