import React, {useContext, useState} from 'react';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import firebase from "firebase";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registration = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            const uid = firebase.auth().currentUser.uid
            if (uid) {
                user.setIsAuth(true)
                await firebase.database().ref(`/users/${uid}/info`).set({
                    login: email,
                    password
                })
                history.push(SHOP_ROUTE)
            }
        } catch (e) {
            throw e
        }
    }

    const login = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="auth">
            <div className="auth__container container">
                <div className="auth__body">
                    <div className="auth__title">
                        {isLogin ? 'Authorization' : 'Registration'}
                    </div>
                    <form action="#" className="auth__form form-auth">
                        <div className="form-auth__input">
                            <input
                                type="text"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-auth__input">
                            <input
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </div>
                        {isLogin ?
                            <div className="form-auth__footer">
                                <div className="form-auth__question">
                                    Don't have an account?
                                    <NavLink className="form-auth__link" to={REGISTRATION_ROUTE}>
                                        Register now!
                                    </NavLink>
                                </div>
                                <div className="form-auth__btn btn" onClick={login}>
                                    Login
                                </div>
                            </div>
                            :
                            <div className="form-auth__footer">
                                <div className="form-auth__question">
                                    Have an account?
                                    <NavLink className="form-auth__link" to={LOGIN_ROUTE}>
                                        Sign in!
                                    </NavLink>
                                </div>
                                <div className="form-auth__btn btn" onClick={registration}>
                                    Registration
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
});

export default Auth;