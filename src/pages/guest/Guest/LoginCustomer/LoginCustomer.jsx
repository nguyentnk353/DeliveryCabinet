import React from "react";
import SocialLoginButton, {
    ActionTypes,
    AuthProviders,
} from "./components/SocialLoginButton";
import AuthImage from '../../../../assets/images/Customer_Login.png';
import AuthDecoration from '../../../../assets/images/auth_decoration.png';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import Auth from "../../../../utils/Auth";
import jwt_decode from 'jwt-decode';
import LogoutCustomer from './../../../../utils/LogoutCustomer';
import useNotification from "../../../../utils/useNotification";
import loginCustomer from './../../../../services/Customer/loginCustomer';


const LoginCustomer = () => {
    const auth = Auth();
    const logout = LogoutCustomer();

    // const { handleGoogleSignIn } = useAuth();
    const [idToken, setIdToken] = useState("");
    const navigate = useNavigate();
    const [isInvalid, setIsInvalid] = useState(false);
    const [msg, sendNotification] = useNotification();

    const provider = new GoogleAuthProvider();

    function login() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setIdToken(user.accessToken);
                loginCustomer(user.accessToken)
                    .then((data) => {
                        const errLogin = 'Invalid Login';

                        if (data.localeCompare(errLogin, 'en', { sensitivity: 'base' }) == 0) 
                        {
                            setIsInvalid(true);
                        } else {
                            setIsInvalid(false);
                            // console.log(data)
                            const decoded = jwt_decode(data);
                            localStorage.setItem('loginUser', JSON.stringify(decoded));
                            localStorage.setItem('token', data);
                            navigate('/customer/home', { replace: true });
                        }
                    })
                    .catch((error) => {
                        sendNotification({ msg: error, variant: 'error' });
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <main className="bg-white">

            <div className="relative md:flex">

                {/* Content */}
                <div className="md:w-1/2">
                    <div className="min-h-screen h-full flex flex-col after:flex-1">

                        {/* Header */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                                {/* Logo */}
                                {/* <Link className="block" to="/">
                                <svg width="32" height="32" viewBox="0 0 32 32">
                                    <defs>
                                        <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                                            <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                                            <stop stopColor="#A5B4FC" offset="100%" />
                                        </linearGradient>
                                        <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                                            <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                                            <stop stopColor="#38BDF8" offset="100%" />
                                        </linearGradient>
                                    </defs>
                                    <rect fill="#6366F1" width="32" height="32" rx="16" />
                                    <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
                                    <path d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z" fill="url(#logo-a)" />
                                    <path d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z" fill="url(#logo-b)" />
                                </svg>
                            </Link> */}
                            </div>
                        </div>

                        <div className="max-sm:px-4 px-[25%]">
                            <h1 className="mb-6 text-3xl font-bold text-slate-800">
                                Chào mừng trở lại✨
                            </h1>
                            {/* Form */}
                            <form className="text-[#475569]">

                                <div className="my-5 text-xs font-medium uppercase text-gray-500">
                                    Đăng nhập
                                </div>
                                <SocialLoginButton
                                    onClick={(e) => { e.stopPropagation(); login(); }}
                                    provider={AuthProviders.GOOGLE}
                                    actionType={ActionTypes.LOGIN}
                                />

                            </form>
                            {/* Footer */}
                                                                     
                            {/* {idToken && <div>{idToken}</div>} */}
                            <div className="mt-6 border-t-[1px] border-slate-200 pt-5">
                                <div className="text-sm text-gray-500">
                                    Nếu tài khoản được đăng nhập lần đầu, bạn sẽ được chuyển
                                    hướng đến trang đăng ký để hoàn tất quá trình đăng ký.
                                    {/* <Link
                                    className={"font-medium text-indigo-500 hover:text-indigo-600"}
                                    href="/signup"
                                >
                                    Đăng ký ngay
                                </Link> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Image */}
                <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
                    <img className="object-center w-auto h-[100%]" src={AuthImage} width="760" height="1024" alt="Authentication" />
                    <img className="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src={AuthDecoration} width="218" height="224" alt="Authentication decoration" />
                </div>

            </div>
        </main>
    );
};

export default LoginCustomer;