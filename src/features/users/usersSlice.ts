import {User} from "../../app/services/auth";
import {createSlice} from "@reduxjs/toolkit";
import {usersApi} from "../../app/services/users";
import {RootState} from "../../app/store";

interface InitialState {
    users: User[] | null
}

const initialState: InitialState = {
    users: null
}

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(usersApi.endpoints.getAllUsers.matchFulfilled, (state, action) => {
                state.users = action.payload
            })
    }
})
 
export default slice.reducer

export const selectUsers = (state: RootState) => state.users;
