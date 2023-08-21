import {createSlice} from "@reduxjs/toolkit";

const storedToken= localStorage.getItem("token");
let isAuthenticated=false;
if(storedToken){
  isAuthenticated=true;
}
console.log(storedToken);

const authSlice=createSlice({
    name:"auth",
    initialState:{isAuthenticated:isAuthenticated,token:storedToken},
    reducers:{
        login(state,action){
            state.isAuthenticated=true;
            state.token=action.payload;
            localStorage.setItem("token",action.payload);

        },
        logout(state){
            state.isAuthenticated=false;
            localStorage.removeItem("token");
        }
    }
})
export const authActions=authSlice.actions;
export default authSlice.reducer