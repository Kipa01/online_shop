import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink, useHistory} from "react-router-dom";
import {ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import firebase from "firebase";

const Navbar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logout = async () => {
        await firebase.auth().signOut()
        user.setIsAuth(false)
        history.push(LOGIN_ROUTE)
    }
    return (
        <header className="header">
            <div className="header__container container">
                <NavLink to={SHOP_ROUTE} className="header__title">
                    Online Shop
                </NavLink>
                {user._isAuth ?
                    <div className="header__buttons">
                        <NavLink className="header__btn btn" to={ADMIN_ROUTE}>Admin Panel</NavLink>
                        <NavLink to={CART_ROUTE} className="header__btn btn">Cart</NavLink>
                        <div className="header__btn btn" onClick={logout}>Logout</div>
                    </div>
                    :
                    <div className="header__buttons">
                        <NavLink to={CART_ROUTE} className="header__btn btn">Cart</NavLink>
                        <NavLink className="header__btn btn" to={LOGIN_ROUTE}>Authorization</NavLink>
                    </div>
                }
            </div>
        </header>
    );
});

export default Navbar;