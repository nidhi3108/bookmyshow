//global object
//with the help of provider we can use store thourghout the whole code and root is app.js 

import { configureStore } from "@reduxjs/toolkit";
import userReducer from  "./userSlice"
import loaderReducer from  "./loaderSlice"

const store = configureStore({
    reducer: {
        loaders: loaderReducer,
        users: userReducer
    }
})

export default store
