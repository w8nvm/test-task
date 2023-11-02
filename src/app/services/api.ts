import { createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react'
import {RootState} from "../store";
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://test-assignment.emphasoft.com",            //process.env["API_BASE_URL"],
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.user?.token ||
            localStorage.getItem('token')

        if (token) {
            headers.set('authorization', `Token ${token}`)
        }
    }
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 3})

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQuery,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})