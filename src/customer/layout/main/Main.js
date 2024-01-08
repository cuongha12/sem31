import React from 'react'
import '../../../App.css'
import Header from '../header/header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/footer'

const Main = () => {
    return (
        <div className="App">
            <Header></Header>

            <Outlet />
            <Footer />
        </div>
    )
}

export default Main