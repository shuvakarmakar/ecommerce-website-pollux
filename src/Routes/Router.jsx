import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Error from "../Pages/Error/Error";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddProducts from "../Pages/Dashboard/Admin Dashboard/AddProducts";
import ManageUsers from "../Pages/Dashboard/Admin Dashboard/ManageUsers";
import Checkout from "../Pages/Dashboard/UserDashboard/Checkout";
import ProductDetails from "../Pages/Home/Products/ProductDetails";
import Cart from "../Pages/Dashboard/UserDashboard/Cart";
import ManageProducts from "../Pages/Dashboard/Admin Dashboard/ManageProducts";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            },
            {
                path: "product/:id",
                element: <ProductDetails></ProductDetails>
            }
        ]
    },
    {
        path: "*",
        element: <Error></Error>
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // Customers Route
            {
                path: 'checkout',
                element: <Checkout></Checkout>
            },
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            // Admin Route
            {
                path: 'addProducts',
                element: <AddProducts></AddProducts>
            },
            {
                path: 'manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: 'manageProducts',
                element: <ManageProducts></ManageProducts>
            }
        ]
    }
]);