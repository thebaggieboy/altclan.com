import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import userSlice from "./user/userSlice"
import brandSlice from "./brands/brandSlice"
import brandUserSlice from "./brands/brandUserSlice";
import shopSlice from "./shop/shopSlice";
import tokenSlice from "./token/tokenSlice"
import brandTokenSlice from "./brand_token/brandTokenSlice"
import wishListSlice from "./wishlist/wishListSlice"
import userActiveEmailSlice from "./user/userActiveEmail";


import {
    persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ["shop", "user", "token", "brand_token", "wishlist"]
}

const rootReducer = combineReducers({
    user : userSlice,
    user_email : userActiveEmailSlice,
    brand_user: brandUserSlice,
    shop: shopSlice,
    wishlist:wishListSlice,
    
    brand_token: brandTokenSlice,
    token: tokenSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => (
        getDefaultMiddleWare({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(logger)
    ),
    devTools: process.env.NODE_ENV !== "production"
})

export const peristor = persistStore(store)


export default store