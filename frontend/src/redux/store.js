import {configureStore} from '@reduxjs/toolkit'
import userAuthorReducer from './userAuthorSlice'

export let store = configureStore({
    reducer:{
        userAuthorLoginReducer:userAuthorReducer
    }
})