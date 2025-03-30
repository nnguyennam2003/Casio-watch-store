import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from 'sonner'

import UserLayout from "./components/Layout/UserLayout"
import AdminLayout from "./components/Admin/AdminLayout"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import CollectionPage from "./pages/CollectionPage"
import ProductDetail from "./components/Products/ProductDetail"
import Checkout from "./components/Cart/Checkout"
import OrderConfirmation from "./pages/OrderConfirmation"
import OrderDetail from "./pages/OrderDetail"
import MyOrderPage from "./pages/MyOrderPage"
import AdminHome from "./pages/AdminHome"
import UserManage from "./components/Admin/UserManage"
import ProductManage from "./components/Admin/ProductManage"
import EditProduct from "./components/Admin/EditProduct"
import OrderManagement from "./components/Admin/OrderManagement"
import NotFound from "./pages/NotFound"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "./redux/slices/authSlice"
import { getListCart } from "./redux/slices/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(getListCart());
    }
  }, [dispatch, user])

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          {
            user ? (
              <>
                {/* User Routes */}
                <Route path="profile" element={<Profile />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="order-confirmation" element={<OrderConfirmation />} />
                <Route path="order/:id" element={<OrderDetail />} />
                <Route path="my-orders" element={<MyOrderPage />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )
          }
        </Route>

        {/* Admin Routes */}
        {user && user.role === "admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="users" element={<UserManage />} />
            <Route path="products" element={<ProductManage />} />
            <Route path="products/:id/edit" element={<EditProduct />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        )}

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
