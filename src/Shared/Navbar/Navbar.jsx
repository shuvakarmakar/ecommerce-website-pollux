import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaCartPlus } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isAdmin] = useAdmin();

    useEffect(() => {
        if (user) {
            // Fetch the latest user data from the backend API
            fetch(``)
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [user]);

    const navItems = (
        <>
            <li className="text-black"><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {!isAdmin && <li><Link to="/dashboard/cart"><FaCartPlus /> Cart</Link></li>} {/* Render only if the user is not an admin */}
        </>
    );

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-2xl rounded-2xl p-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case lg:text-xl sm:text-sm">Ecommerce Pollux</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            {user ? (
                <div className="navbar-end">
                    {userData && (
                        <span className="text-slate-900 mr-2">
                            Welcome, <Link to="/profile">{userData.name}</Link>
                        </span>
                    )}
                    <button onClick={handleLogout} className="btn btn-neutral">
                        Logout
                    </button>
                </div>
            ) : (
                <div className="navbar-end">
                    <button className="btn">
                        <Link to="/login">Login</Link>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
