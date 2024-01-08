import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice( {
	name: "user",
	initialState: {
		loginUser: {
			currentUser: null,
			isFetching: false,
			error: false
		},
		logoutUser: {
			isFetching: false,
			error: false
		},
		register:{
			isFetching: false,
			error: false,
			success: false
		}
	},
	reducers: {
		loginUserStart: ( state ) => {
			state.loginUser.isFetching = true;
		},
		loginUserSuccess: ( state, action ) => {
			state.loginUser.isFetching = false;
			state.loginUser.currentUser = action.payload;
			state.loginUser.error = false
		},
		loginUserFailed: ( state ) => {
			state.loginUser.isFetching = false;
			state.loginUser.error = true;
		},
		logoutUserStart: ( state ) => {
			state.logoutUser.isFetching = true;
		},
		logoutUserSuccess: ( state, action ) => {
			state.logoutUser.isFetching = false;
			state.logoutUser.currentUser = null;
			state.logoutUser.error = false
		},
		logoutUserFailed: ( state ) => {
			state.logoutUser.isFetching = false;
			state.logoutUser.error = true;
		},
		registerStart: ( state ) => {
			state.register.isFetching = true;
		},

		registerSuccess: ( state ) => {
			state.register.isFetching = false;
			state.register.success = true;
			state.register.error = false
		},
		registerFailed: ( state ) => {
			state.register.isFetching = false;
			state.register.error = true;
			state.register.success = false;

		},

	}
} )

export const  {
	loginUserStart, loginUserFailed, loginUserSuccess, logoutUserStart, logoutUserSuccess, logoutUserFailed,
	registerSuccess,registerStart,registerFailed
} = userSlice.actions

export default userSlice.reducer;