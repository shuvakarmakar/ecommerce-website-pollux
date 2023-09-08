import { useContext, useRef } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {

    const { signIn, signInWithGoogle, resetPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // console.log(email, password);

        // SignIn Call
        signIn(email, password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
            })
    }


    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please Provide Email First to Reset Password');
            return;
        }
        resetPassword(email)
            .then(() => {
                alert('Please Check Your Email');
            })
            .catch(error => {
                console.log(error);
            });
    };



    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-10 w-1/2">
                    <img src="" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold">Login now!</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' ref={emailRef} placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <p><small>Forgot password? Please <button onClick={handleResetPassword} className=" btn-link"> Reset Password</button> </small></p>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Login" className="btn btn-primary" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>New to thi Ecommerce Site ? Please <Link className='text-amber-300' to='/signup'>Sign Up</Link></p>
                        <button onClick={handleGoogleLogin} className="btn btn-outline"><FaGoogle></FaGoogle> SignIn With Google</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;