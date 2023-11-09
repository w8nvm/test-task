import {api} from "./api";
import {RootState} from "../store";

export type User = {
    id: number,
    username: string,
    password: string,
    first_name?: string,
    last_name?: string,
    is_active: boolean,
    last_login: string,
    is_superuser: boolean
}

type ResponseLoginData = { username: string, token: string }

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, User>({
            query: (UserData) => ({
                url: '/api/v1/login/',
                method: 'POST',
                body: UserData
            })
        }),
    })
})

export const {useLoginMutation} = authApi
export const {endpoints: {login}} = authApi

export const selectUser = (state: RootState) => state.auth.user