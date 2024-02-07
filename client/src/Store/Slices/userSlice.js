import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';



const userSlice = createSlice({
    name : "user",
    initialState : {
        isLoading : false,
        data : [],
        isError : false
    },
    // reducers : {
    //     addProduct(state, action){
            
    //     },
    //     removeProduct(state, action){

    //     }
    // },
    extraReducers : (builder) =>  {
        
    }

})

export default userSlice.reducer;