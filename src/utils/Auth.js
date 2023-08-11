import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const Auth = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyALTDhIOvX-qOLiOeu79aB7y8v0_BHWDuc",
        authDomain: "deliverycabinet.firebaseapp.com",
        projectId: "deliverycabinet",
        storageBucket: "deliverycabinet.appspot.com",
        messagingSenderId: "785253837253",
        appId: "1:785253837253:web:ab7c71b83cfac450a2c3ac",
        measurementId: "G-4RR8NB47JM"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    return auth;

}

export default Auth