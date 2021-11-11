import React from 'react';
import Typebar from "../components/Typebar";
import Brandbar from "../components/Brandbar";
import DeviceList from "../components/DeviceList";

const Shop = () => {
    return (
        <div className="shop">
            <div className="shop__container container">
                <div className="shop__body">
                    <Typebar/>
                    <div className="shop__content">
                        <Brandbar/>
                        <DeviceList/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;