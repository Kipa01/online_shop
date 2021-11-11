import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import firebase from "firebase";
import CartStore from "./store/CartStore";

firebase.initializeApp({
    apiKey: "AIzaSyCO6wMCemrK6sRIqn7sIMff2WA7CJpvnlw",
    authDomain: "online-shop-376f9.firebaseapp.com",
    projectId: "online-shop-376f9",
    storageBucket: "online-shop-376f9.appspot.com",
    messagingSenderId: "587730822893",
    appId: "1:587730822893:web:f9b3f9beb0652622d98ee4"
})

const db = firebase.firestore()

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        cart: new CartStore(),
        db
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);