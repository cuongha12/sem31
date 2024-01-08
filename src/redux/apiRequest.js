import axios from "axios";
import {
	loginFailed,
	loginStart,
	loginSuccess,
	logoutFailed,
	logoutStart,
	logoutSuccess,
} from "./AuthSlice";
import {
	loginUserFailed,
	loginUserStart,
	loginUserSuccess, logoutUserFailed,
	logoutUserStart,
	logoutUserSuccess, registerStart, registerSuccess,
	registerFailed

} from "./UserSlice";
import { CartFailed, CartStart, CartSuccess, fetchCartCount } from "./CartSilce";
import { message } from "antd";
import Swal from "sweetalert2";


export const loginAdmin = async( user, dispatch, navigate, Swal ) => {
	dispatch( loginStart() )
	try {
		const res = await axios.post( '/login', user )
		if ( res.data.status === 404 ) {
			Swal.fire( {
				icon: 'error',
				title: 'Thông báo',
				text: `${ res.data.mess }`,
			} )
			dispatch( loginFailed( res.data ) )
		} else if( res.data.status === 403){
			Swal.fire( {
				icon: 'error',
				title: 'Thông báo',
				text: `${ res.data.mess }`,
			} )
			dispatch( loginUserFailed( res.data ) )
		}
		else {
			Swal.fire( {
				icon: 'success',
				title: 'Thông báo',
				text: `${ res.data.mess }`,
			} )
			dispatch( loginSuccess( res.data ) )
			navigate( '/admin' )
			window.location.reload()
		}
	} catch ( error ) {
		dispatch( loginFailed() )
	}
}

export const logOutAdmin = async( user, axiosJWT, dispatch, navigate ) => {
	dispatch( logoutStart() )
	try {
		await axiosJWT.delete( '/logout', {
			headers: {
				Authorization: `Bearer ${ user.accessToken }`
			}
		} )
		dispatch( logoutSuccess() )
		navigate( '/admin/login' )

	} catch ( error ) {
		dispatch( logoutFailed() )
	}

}

export const loginUser = async( user, dispatch, navigate, Swal ) => {
	dispatch( loginUserStart() )
	try {
		const res = await axios.post( '/user/login', user )
		if ( res.data.status === 404 ) {
			Swal.fire( {
				icon: 'error',
				title: 'Thông báo',
				text: `${ res.data.mess }`,
			} )
			dispatch( loginUserFailed( res.data ) )
		} else if ( res.data.status === 203 ) {
			Swal.fire( {
				icon: 'error',
				title: 'Thông báo',
				text: `${ res.data.mess }`,
			} )
			dispatch( loginUserFailed( res.data ) )
		}else if( res.data.status === 403){
			Swal.fire( {
				icon: 'error',
				title: 'Thông báo',
				text: `${ res.data.mess }`,
			} )
			dispatch( loginUserFailed( res.data ) )
		}
		else {
			Swal.fire( {
				icon: 'success',
				title: 'Thông báo',
				text: `${ res.data.mess }`,
			} ).then( () => {
				dispatch( loginUserSuccess( res.data ) )
				navigate( '/' )
				window.location.reload()
			} )
		}
	} catch ( error ) {
		dispatch( loginUserFailed() )
	}
}

export const logOutUser = async( user, axiosJWT, dispatch, navigate ) => {

	dispatch( logoutUserStart() )
	try {
		await axiosJWT.delete( '/user/logout', {
			headers: {
				Authorization: `Bearer ${ user.accessToken }`
			}
		} )
		dispatch( logoutUserSuccess() )
		navigate( '/login' )

	} catch ( error ) {
		dispatch( logoutUserFailed() )
	}

}

export const getCart = async( user, dispatch, axiosJWT, ) => {
	// dispatch( CartStart() )
	dispatch(fetchCartCount())
	try {
		const res = await axiosUser.get( '/cart', {
			headers: {
				Authorization: `Bearer ${ user.accessToken }`
			}
		} )
		if ( res.data.status !== 200 ) {
			dispatch(fetchCartCount())
			// dispatch( CartFailed() )
		} else {
			dispatch(fetchCartCount())
			// dispatch( CartSuccess( res.data.data ) )
		}
	} catch ( error ) {
		dispatch(fetchCartCount())
		// dispatch( CartFailed() )
	}

}

export const addProduct = async( user, dispatch, axiosJWT, value, cart, newVariant ) => {
	// dispatch( CartStart() )
	dispatch(fetchCartCount())
	try {
		let update;
		const res = await axiosJWT.post( '/cart/create', value, {
			headers: {
				Authorization: `Bearer ${ user.accessToken }`
			}
		} )
		if( res.data.status === 201){
			dispatch(fetchCartCount())
		}
		// const idCheck = cart.find( ( e ) => e.id === res?.data?.data?.id )
		// if ( idCheck ) {
		// 	const updateCart = cart.map( ( e ) => e.id === idCheck.id ? {
		// 		...idCheck,
		// 		quantity: idCheck.quantity + value.quantity
		// 	} : e )
		// 	update = updateCart
		// 	dispatch( CartSuccess( update ) )
		// } else {
		// 	const newCart = { ...res.data.data, variant: newVariant }
		// 	update = [ ...cart, newCart ]
		// 	dispatch( CartSuccess( update ) )
		// }
	} catch ( e ) {
		// dispatch( CartFailed() )
		dispatch(fetchCartCount())
	}
}

export const updateProduct = async( user, dispatch, axiosJWT, type, id, cart ) => {
	// dispatch( CartStart() )
	try {
		let update;
		const idCheck = cart.find( ( e ) => e.id === id )
		if ( idCheck ) {
			if ( type === 'plus' ) {
				const res = await axiosJWT.put( `/cart/update/${ idCheck.id }?action=${ type }`, {
					headers: {
						Authorization: `Bearer ${ user.accessToken }`
					}
				} )
				if ( res.data.status === 201 ) {
					// const updateCart = cart.map( ( e ) => e.id === idCheck.id ?
					// 	{ ...idCheck, quantity: idCheck.quantity + 1 } : e )
					// update = updateCart
					// dispatch( CartSuccess( update ) )
					dispatch(fetchCartCount())
				} else if ( res.data.status === 403 ) {
					Swal.fire( {
						text: `${ res.data.mess }`,
					} )
				} else {
					message.error( `${ res.data.mess }` )
				}
			} else if ( type === 'delete' ) {
				const res = await axiosJWT.delete( `/cart/delete/${ idCheck.id }`, {
					headers: {
						Authorization: `Bearer ${ user.accessToken }`
					}
				} )
				if ( res.data.status === 201 ) {
					// const updateCart = cart.filter( ( e ) => e.id !== idCheck.id )
					// update = updateCart
					// dispatch( CartSuccess( update ) )
					dispatch(fetchCartCount())
				} else {
					message.error( `${ res.data.mess }` )
				}
			} else {
				if ( idCheck.quantity === 1 ) {
					Swal.fire( {
						text: 'Bạn chắc chắn muốn bỏ sản phẩm này?',
						cancelButtonText: 'Không',
						showCancelButton: true,
						confirmButtonText: 'Có',
					} ).then( async( result ) => {
						/* Read more about isConfirmed, isDenied below */
						if ( result.isConfirmed ) {
							const res = await axiosJWT.put( `/cart/update/${ idCheck.id }?action=${ type }`, {
								headers: {
									Authorization: `Bearer ${ user.accessToken }`
								}
							} )
							if ( res.data.status === 200 ) {
								// const updateCart = cart.filter( ( e ) => e.id !== idCheck.id )
								// update = updateCart
								// dispatch( CartSuccess( update ) )
								dispatch(fetchCartCount())
							} else {
								message.error( `${ res.data.mess }` )
							}
						}
					} )
				} else {
					const res = await axiosJWT.put( `/cart/update/${ idCheck.id }?action=${ type }`, {
						headers: {
							Authorization: `Bearer ${ user.accessToken }`
						}
					} )
					if ( res.data.status === 201 ) {
						// const updateCart = cart.map( ( e ) => e.id === idCheck.id ?
						// 	{ ...idCheck, quantity: idCheck.quantity - 1 } : e )
						// update = updateCart
						// dispatch( CartSuccess( update ) )
						dispatch(fetchCartCount())
					} else {
						message.error( `${ res.data.mess }` )
					}
				}

			}
		} else {
			message.error( 'Không tìm thấy sản phẩm' )
		}
	} catch ( e ) {
		// dispatch( CartFailed() )
		dispatch(fetchCartCount())
	}
}


export const RegisterApi = async( user, dispatch, navigate, Swal ) => {
	dispatch(registerStart())
	try {
		const res = await axios.post( '/user/register', user )
		if ( res.data.status === 203 ) {
			Swal.fire( {
				icon: 'error',
				title: 'Thông báo',
				text: `${ res.data.mess }`,
			} )
			dispatch(registerFailed())
		} else {
			Swal.fire( {
				icon: 'success',
				title: 'Thông báo',
				text: `${ res.data.mess }`,
			} ).then( () => {
				dispatch(registerSuccess())
				navigate( '/login' )
			} )
		}
	} catch ( error ) {
		dispatch(registerFailed())
	}
}



