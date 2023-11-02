import {authApi, User} from "./auth";
import {api} from './api'

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => ({
                url: 'api/v1/users/',
                method: 'GET'
            })
        }),
        getUser: builder.query<User, string>({
            query: (id) => ({
                url: `api/v1/users/${id}/`,
                method: 'GET'
            })
        }),
        editUser: builder.mutation<string, User>({
            query: (user) => ({
                url: `api/v1/users/${user.id}/`,
                method: 'PUT',
                body: user
            })
        }),
        removeUser: builder.mutation<number, number>({
            query: (id) => ({
                url: `api/v1/users/${id}/`,
                method: 'DELETE',
                body: {id}
            })
        }),
        addUser: builder.mutation<User, User>({
            query: (user) => ({
                url: `api/v1/users/`,
                method: 'POST',
                body: user
            })
        })
    })
})

export const {
    useGetAllUsersQuery,
    useGetUserQuery,
    useEditUserMutation,
    useRemoveUserMutation,
    useAddUserMutation,
} = usersApi
export const {
    endpoints: {
        getAllUsers,
        getUser,
        editUser,
        removeUser,
        addUser
    }} = usersApi