import logo from './logo.svg';
import './App.css';
import Header from './customer/layout/header/header';
import 'antd/dist/reset.css';
import Home from './customer/page/home/home';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Shop from './customer/page/shop/shop';
import Btn_x from './component/btn/btn_x';
import Footer from './customer/layout/footer/footer';
import DetailProduct from './customer/page/detail-product/detail_product';
import Cart from './customer/page/cart/cart';
import Checkout from './customer/page/checkout/checkout';
import HeaderAdmin from './admin/layout/header/header';
import Login from './admin/page/login/Login';
import { AppProvider } from './Context/AppContext';
import UserMember from './admin/page/UserMember/UserMember';
import ChangPassword from './admin/page/UserProfile/ChangPassword';
import UserProfile from './admin/page/UserProfile/UserProfile';
import Category from './admin/page/category/Category';
import Item from './admin/page/item/Item';
import Color from './admin/page/color/Color';
import Size from './admin/page/size/Size';
import Notfound from './admin/page/404/Notfound';
import Product from './admin/page/product/Product';
import Main from './customer/layout/main/Main';
import LoginCustomer from "./customer/page/login/LoginCustomer";
import Register from "./customer/page/register/Register";
import UserCustomer from "./admin/page/UserCustomer/UserCustomer";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path='' element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/shop/" element={<Shop />} />
          <Route path="/detail/:id" element={<DetailProduct />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/checkout/" element={<Checkout />} />
          <Route path='*' element={<Notfound />} />
          {/* <Route path="contact" element={<Contact />} /> */}
        </Route>
        <Route path='/login' element={<LoginCustomer />}>

        </Route>
        <Route path='/register' element={<Register />}>

        </Route>
        {/* <Route path='' element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="detail_product" element={<DetailProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} /> */}
        {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        <Route path='/admin/' element={<HeaderAdmin />}>
          <Route path='get' element={<UserMember />} />
          <Route path='change-password' element={<ChangPassword />} />
          <Route path='profile' element={<UserProfile />} />
          <Route path='category' element={<Category />} />
          <Route path='item' element={<Item />} />
          <Route path='color' element={<Color />} />
          <Route path='size' element={<Size />} />
          <Route path='product' element={<Product />} />
          <Route path='*' element={<Notfound />} />
          <Route path='usercustomer' element={<UserCustomer />} />
        </Route>
        <Route path='/admin/login/' element={<Login />}>
          <Route path='*' element={<Notfound />} />
        </Route>
        <Route path='*' element={<Notfound />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
