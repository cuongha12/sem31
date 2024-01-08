
import axios from 'axios'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios, createAxiosJwt } from '../createInstance'
import { getCart } from "../redux/apiRequest";
export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const user = useSelector((e) => e?.auth?.login?.currentUser)
    const userCustomer = useSelector((e) => e?.user?.loginUser?.currentUser)
    const dispatch = useDispatch()
    let axiosJWT = createAxios(user, dispatch)
    let axiosUser = createAxiosJwt(userCustomer, dispatch)
    const [userMember, setUserMember] = useState([])
    const [category, setCategory] = useState([])
    const [item, setItem] = useState([])
    const [color, setColor] = useState([])
    const [size, setSize] = useState([])
    const [product, setProduct] = useState([])
    const [productHome,setProductHome] = useState([])
    const [userGroup, setUserGroup] = useState([])
    const getUserMember = async () => {
        const res = await axiosJWT.get('/getAdmin', {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            }
        })
        setUserMember(res.data.data.rows)

    }

    const getProductHome = async () => {
        return axios.get('/product/home').then((res) => setProductHome(res.data.data.rows))
    }
    
    const getProduct = useCallback(async () => {

        const res = await axiosJWT.get('/product', {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            }
        })
        setProduct(res.data.data.rows)

    }, [axiosJWT, user])
    const getCategory = async () => {
        const res = await axios.get('/category')
        setCategory(res.data.data.rows)

    }

    const getUserCustomer = async () => {
        return await axios.get('/user').then((res)=>setUserGroup(res.data.data))
    }

    const getItem = async () => {
        const res = await axios.get('/item')
        setItem(res.data.data.rows)
    }
    const getColor = async () => {
        const res = await axiosJWT.get('/color', {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            }
        })
        setColor(res.data.data.rows)

    }
    const getSize = async () => {
        const res = await axiosJWT.get('/size', {
            headers: {
                Authorization: `Bearer ${user?.accessToken}`
            }
        })
        setSize(res.data.data.rows)

    }

    // const loadData = async () => {
    //     await getUserMember()
    //     await getCategory()
    //     await getItem()
    //     await getColor()
    //     await getSize()
    // }
    useEffect(() => {
        getUserMember()
        getCategory()
        getItem()
        getColor()
        getSize()
        getProduct()
        getProductHome()
        getCart( userCustomer, dispatch, axiosUser )
        getUserCustomer()
    }, [])
    return (
        <AppContext.Provider
            value={{
                user,
                axiosJWT,
                dispatch,
                userMember,
                getUserMember,
                getCategory,
                getItem,
                getColor,
                getSize,
                category,
                item,
                color,
                size,
                product,
                getProduct,
                productHome,
                userCustomer,
                axiosUser,
                userGroup,
                getUserCustomer
            }}
        >

            {children}
        </AppContext.Provider>
    )
}
