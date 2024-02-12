import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

//Action
export const fetchExpenses = createAsyncThunk("fetchExpenses", async({search, category, prevDate, nextDate}) => {
    const response = await axios.get('http://localhost:8080/fetch_expenses', {params : {
        search : search, category : category, prevDate : prevDate, nextDate : nextDate
    }});
    return response.data;
})

export const addExpenses = createAsyncThunk("addExpenses", async(data) => {
    // console.log('...........', data);
    await axios.post('http://localhost:8080/add_expenses', data);
})

export const editExpenses = createAsyncThunk("editExpenses", async(data) => {
    console.log('...........', data);
    await axios.post('http://localhost:8080/edit_expenses', data);
})

export const fetchCategory = createAsyncThunk("fetchcategory", async() => {
    // console.log("...");
    const response = await axios.get('http://localhost:8080/fetch_category');
    // console.log(response);
    return response.data;
})

export const addCategory = createAsyncThunk("addcategory", async(data) => {
    console.log('...........', data);
    await axios.post('http://localhost:8080/add_category', data);
})

const userSlice = createSlice({
    name : "expense",
    initialState : {
        isLoading : false,
        expenses : [],
        categories : [],
        isError : false
    },
    
    extraReducers : (builder) =>  {
        builder.addCase(fetchExpenses.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.expenses = action.payload;
            console.log('action of expenses',action.payload);
            console.log(state.expenses);
        });
        builder.addCase(fetchExpenses.pending, (state, action)=> {
            state.isLoading = true;
        });
        builder.addCase(addExpenses.fulfilled, (state, action)=> {
            state.expenses.push(action.payload);
        });
        builder.addCase(fetchCategory.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.categories = action.payload;
            console.log('action of category',action.payload);
            console.log(state.categories);
        });
        builder.addCase(fetchCategory.pending, (state, action)=> {
            state.isLoading = true;
        });
        builder.addCase(addCategory.fulfilled, (state, action)=> {
            state.categories.push(action.payload);
        });
    }

})

export default userSlice.reducer;
