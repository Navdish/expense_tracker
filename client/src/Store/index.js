import {configureStore} from "@reduxjs/toolkit";
import userSlice from './Slices/userSlice'

const store = configureStore({
    reducer : {
        Users : userSlice
    }
})

export default store;