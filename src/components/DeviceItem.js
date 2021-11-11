import React from 'react';
import {useHistory} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const history = useHistory()
    return (
        <div className="shop__item shop-item" onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <div className="shop-item__image">
                <img src={device.img} alt=""/>
            </div>
            <div className="shop-item__desc">
                <div className="shop-item__brand">
                    {device.brand}
                </div>
                <div className="shop-item__rate">
                    {device.rate} &#9733;
                </div>
            </div>
            <div className="shop-item__name">
                {device.name}
            </div>
        </div>
    );
};

export default DeviceItem;