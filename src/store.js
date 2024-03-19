import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice.js/userSlice";
import podcastReducers from "./slice.js/podcastSlice";

const store = configureStore({
   reducer:{
   user:userReducer,
   podcasts:podcastReducers
   } 
})





export default store








