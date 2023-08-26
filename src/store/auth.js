import {createSlice} from "@reduxjs/toolkit";

const storedToken= localStorage.getItem("token");
const storedId=localStorage.getItem("userId")
let isAuthenticated=false;
if(storedToken){
  isAuthenticated=true;
}
console.log(storedToken);

const authSlice=createSlice({
    name:"auth",
    initialState:{isAuthenticated:isAuthenticated,token:storedToken,userId:storedId},
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            state.token=action.payload.token;
            state.userId=action.payload.userId;
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("userId",action.payload.userId);

        },
        logout(state){
            localStorage.removeItem("theme");
            state.isAuthenticated=false;
            localStorage.removeItem("token");
           
            localStorage.removeItem("userId");
        }
    }
})
export const authActions=authSlice.actions;
export default authSlice.reducer