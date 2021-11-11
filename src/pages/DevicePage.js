import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Context} from "../index";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";

const DevicePage = observer(() => {
    const {device} = useContext(Context)
    const {cart} = useContext(Context)
    const [deviceInfo, setDeviceInfo] = useState({})
    const [specifications, setSpecifications] = useState([])
    const {id} = useParams()

    const addToCart = () => {
        cart.setItems()
        localStorage.setItem('cart', JSON.stringify(deviceInfo))
        console.log('added!')
    }

    useEffect(() => {
        const item = toJS(device.devices)
        const itemInfo = {...item.filter(i => i.info.id === +id)}[0].info
        const itemSpecifications = {...item.filter(i => i.info.id === +id)}[0].specifications
        setDeviceInfo(itemInfo)
        setSpecifications(itemSpecifications)
    }, [])
    return (
        <div className="device">
            <div className="device__container container">
                <div className="device__body">
                    <div className="device__col">
                        <div className="device__image">
                            <img src={deviceInfo.img} alt=""/>
                        </div>
                    </div>
                    <div className="device__col">
                        <div className="device__title">
                            {deviceInfo.name}
                        </div>
                        <div className="device__rate">
                            &#9733;
                            <span>{deviceInfo.rate}</span>
                        </div>
                    </div>
                    <div className="device__col">
                        <div className="device__add add-device">
                            <div className="add-device__sum">
                                {deviceInfo.price} $
                            </div>
                            <div className="add-device__btn btn" onClick={addToCart}>
                                Add to cart
                            </div>
                        </div>
                    </div>
                </div>
                <div className="device__specific specific-device">
                    <div className="specific-device__title">
                        Specifications:
                    </div>
                    {specifications.map(specification =>
                        <div key={specification.id} className="specific-device__item">
                            {specification.title}: {specification.description}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export default DevicePage;