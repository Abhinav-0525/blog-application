import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//make http request using the redux thunk middleware
export const userAuthorLoginThunk = createAsyncThunk('user-author-login', async (userCredObj, thunkApi)=>{
    try{
        if(userCredObj.userType==="user"){
            let resp = await axios.post("http://localhost:4000/user-api/login", userCredObj);
            if(resp.data.message==="Login successful"){
                //store the token in the local/ session storage
                localStorage.setItem('token', resp.data.token);
            }
            else{
                // incase the login is not successful
                return thunkApi.rejectWithValue(resp.data.message);
            }
            return resp.data;
        }
        if(userCredObj.userType === "author"){
            let resp = await axios.post('http://localhost:4000/author-api/login', userCredObj);
            if(resp.data.message==="Login successful"){
                //store the token in the local/ session storage
                localStorage.setItem('token', resp.data.token);
            }
            else{
                // incase the login is not successful
                return thunkApi.rejectWithValue(resp.data.message);
            }
            return resp.data;
        }
    }catch(err){
        return thunkApi.rejectWithValue(err);
    }
});


export const userAuthorSlice = createSlice({
    name:"user-author-login",
    initialState: {
        isPending:false,
        loginUserStatus:false,
        currentUser:{},
        errorOccurred:false,
        errMsg:""
    },
    reducers:{
        resetState:(state,action)=>{
            state.isPending = false;
            state.currentUser={};
            state.loginUserStatus=false;
            state.errorOccurred=false;
            state.errMsg="";
        }
    },
    extraReducers: builder=>builder
    .addCase(userAuthorLoginThunk.pending, (state, action)=>{
        state.isPending = true;
    })
    .addCase(userAuthorLoginThunk.fulfilled, (state, action)=>{
        state.isPending = false;
        state.currentUser=action.payload.obj;
        state.loginUserStatus=true;
        state.errMsg=""
        state.errorOccurred=false;
    })
    .addCase(userAuthorLoginThunk.rejected, (state, action)=>{
        state.isPending = false;
        state.currentUser={};
        state.loginUserStatus=false;
        state.errMsg= action.payload;
        state.errorOccurred=true;
    }),
});

//export action creator functions
export const {resetState} = userAuthorSlice.actions;

//export the root reducer of the slice
export default userAuthorSlice.reducer;