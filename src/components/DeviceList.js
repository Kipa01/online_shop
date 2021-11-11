import React, {useContext, useEffect, useState} from 'react';
import DeviceItem from "./DeviceItem";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {toJS} from "mobx";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    const [devices, setDevices] = useState([])

    let deviceList = []

    useEffect(() => {
        const fetchDevices = toJS(device._devices)
        setDevices(fetchDevices)
    }, [])

    if (toJS(device.selectedType).name && toJS(device.selectedBrand).name) {
        deviceList = devices.filter(item => item.info.type === toJS(device.selectedType).name && item.info.brand === toJS(device.selectedBrand).name)
    } else if (!toJS(device.selectedType).name && toJS(device.selectedBrand).name) {
        deviceList = devices.filter(item => item.info.brand === toJS(device.selectedBrand).name)
    } else if (toJS(device.selectedType).name && !toJS(device.selectedBrand).name) {
        deviceList = devices.filter(item => item.info.type === toJS(device.selectedType).name)
    } else {
        deviceList = devices
    }

    return (
        <div className="shop__wrapper">
            {deviceList.length === 0
                ?
                <span
                    style={{color: 'black', display: 'block', margin: '0 auto'}}
                >Таких товаров нет!</span>
                :
                deviceList.map(item =>
                    <DeviceItem key={item.info.id} device={item.info}/>
                )
            }
        </div>
    )
});

export default DeviceList;