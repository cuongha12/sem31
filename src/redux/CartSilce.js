import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCart } from "./apiRequest";
import { useDispatch, useSelector } from "react-redux";

export const fetchCartCount = createAsyncThunk( 'cart/fetchCartCount', async() => {
	const dispatch = useDispatch()
	const [ data, err ] = await getCart();
	if ( !err ) {
		return data;
	} else {
		throw new Error( 'Cannot fetch cart count' );
	}
} );

const cartSlice = createSlice( {
	name: "cart",
	initialState: {
		cart: {
			currentCart: null,
			isFetching: false,
			error: false
		},

	},
	reducers: {
		// CartStart: ( state ) => {
		// 	state.cart.isFetching = true;
		// },
		// CartSuccess: ( state, action ) => {
		// 	state.cart.isFetching = false;
		// 	state.cart.currentCart = action.payload;
		// 	state.cart.error = false
		// },
		// CartFailed: ( state ) => {
		// 	state.cart.isFetching = false;
		// 	state.cart.error = true;
		// }

	},
	extraReducers: ( builder ) => {
		builder.addCase( fetchCartCount.fulfilled, ( state, action ) => {
			state.isFetching = false;
			state.currentCart = action.payload;
			state.error = false
		} );
		builder.addCase( fetchCartCount.pending, ( state ) => {
			state.isFetching = true;
		} );
		builder.addCase( fetchCartCount.rejected, ( state, action ) => {
			state.isFetching = false;
			state.error = true;
		} );
	},
} )

export const {
	CartSuccess, CartStart, CartFailed
} = cartSlice.actions

export default cartSlice.reducer;