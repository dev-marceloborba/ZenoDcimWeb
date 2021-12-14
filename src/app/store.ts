import { configureStore, Middleware } from '@reduxjs/toolkit'
import { api } from 'app/services/authentication'
import { rackApi } from 'app/services/rack'
import authReducer, { localStorageMiddleware, reHydrateStore } from 'features/authentication/authenticationSlice'
import { automationApi } from './services/automation'
import { companyApi } from './services/company'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [rackApi.reducerPath]: rackApi.reducer,
        [automationApi.reducerPath]: automationApi.reducer,
        [companyApi.reducerPath]: companyApi.reducer,
        auth: authReducer
    },
    preloadedState: {
        auth: reHydrateStore()
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        api.middleware,
        rackApi.middleware,
        automationApi.middleware,
        companyApi.middleware
    )
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
