import React, {useContext, useState} from 'react';
import Modal from "../components/Modal";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import firebase from "firebase";

const Admin = observer(() => {
    const {device} = useContext(Context)
    const {db} = useContext(Context)

    const [typeVisible, setTypeVisible] = useState(false)
    const [brandVisible, setBrandVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    const [info, setInfo] = useState([])

    const [typeInfo, setTypeInfo] = useState("")
    const [brandInfo, setBrandInfo] = useState("")
    const [deviceType, setDeviceType] = useState('Choose type')
    const [deviceBrand, setDeviceBrand] = useState('Choose brand')
    const [deviceName, setDeviceName] = useState('')
    const [devicePrice, setDevicePrice] = useState('')
    const [deviceFile, setDeviceFile] = useState(null)

    let imgUrl = ''

    // Storage firebase
    let storageRef = firebase.storage().ref()

    const addDevice = async (e) => {
        e.preventDefault()
        const id = Date.now()

        // loading img to storage
        let deviceImagesRef = storageRef.child(`images/devices/${deviceFile.name}`)
        await deviceImagesRef.put(deviceFile)

        // get link of loaded img
        await storageRef.child(`images/devices/${deviceFile.name}`).getDownloadURL()
            .then((url) => {
                imgUrl = url
            })
            .catch((error) => {
                console.log(error)
            });

        let newDevices = [...device.devices]
        const data = {
            info: {
                id,
                type: deviceType,
                brand: deviceBrand,
                name: deviceName,
                img: imgUrl,
                price: devicePrice,
                rate: "0"
            },
            specifications: info
        }
        newDevices.push(data)
        device.setDevices(newDevices)
        e.target.reset()
        setDeviceFile(null)
        setDeviceBrand("Choose brand")
        setDeviceType("Choose type")
        setDeviceName("")
        setDevicePrice("")
        setInfo([])
        db.collection("devices").doc(`${id}`).set(data);
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}])
    }
    const removeInfo = (id) => {
        setInfo(info.filter(item => item.id !== id))
    }
    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? {...i, [key]: value} : i))
    }
    const addType = (e) => {
        e.preventDefault()
        if (typeInfo === "") {
            alert("Enter a name of the new type")
        } else {
            const id = Date.now()
            const data = {id, name: typeInfo}
            let newTypes = [...device.types]
            db.collection("types").doc(`${id}`).set(data)
                .then(() => {
                    newTypes.push(data)
                    device.setTypes(newTypes)
                    setTypeInfo("")
                })
                .catch((error) => {
                    alert("Error creating new type: " + error)
                })
        }
    }

    const addBrand = (e) => {
        e.preventDefault()
        if (brandInfo === "") {
            alert("Enter a name of the new brand")
        } else {
            const id = Date.now()
            const data = {id, name: brandInfo}
            let newBrands = [...device.brands]
            db.collection("brands").doc(`${id}`).set(data)
                .then(() => {
                    newBrands.push(data)
                    device.setBrands(newBrands)
                    setBrandInfo("")
                })
                .catch((error) => {
                    alert("Error creating new type: " + error)
                })
        }
    }

    return (
        <>
            <div className="admin">
                <div className="admin__container container">
                    <div className="admin__item btn" onClick={() => setTypeVisible(true)}>
                        Add type
                    </div>
                    <div className="admin__item btn" onClick={() => setBrandVisible(true)}>
                        Add brand
                    </div>
                    <div className="admin__item btn" onClick={() => setDeviceVisible(true)}>
                        Add device
                    </div>
                </div>
            </div>
            <Modal active={typeVisible} setActive={setTypeVisible}>
                <form action="#" className="modal__form form-modal" onSubmit={e => addType(e)}>
                    <div className="form-modal__input">
                        <input
                            type="text"
                            placeholder="Input name of type"
                            value={typeInfo}
                            onChange={e => setTypeInfo(e.target.value)}
                        />
                    </div>
                    <div className="form-modal__footer">
                        <button type="submit" className="form-modal__btn btn">
                            Add new type
                        </button>
                    </div>
                </form>
            </Modal>
            <Modal active={brandVisible} setActive={setBrandVisible}>
                <form action="#" className="modal__form form-modal" onSubmit={e => addBrand(e)}>
                    <div className="form-modal__input">
                        <input
                            type="text"
                            placeholder="Input name of brand"
                            value={brandInfo}
                            onChange={e => setBrandInfo(e.target.value)}
                        />
                    </div>
                    <div className="form-modal__footer">
                        <button type="submit" className="form-modal__btn btn">
                            Add new brand
                        </button>
                    </div>
                </form>
            </Modal>
            <Modal active={deviceVisible} setActive={setDeviceVisible}>
                <form action="#" className="modal__form form-modal" onSubmit={e => addDevice(e)}>
                    <div className="form-modal__input">
                        <select
                            value={deviceType}
                            onChange={e => setDeviceType(e.target.value)}
                        >
                            <option defaultValue={true} style={{display: 'none'}} value="Choose type">Choose type
                            </option>
                            {device._types.map(type =>
                                <option key={type.id} value={type.name}>{type.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-modal__input">
                        <select
                            value={deviceBrand}
                            onChange={e => setDeviceBrand(e.target.value)}
                        >
                            <option defaultValue={true} style={{display: 'none'}} value="Choose brand">Choose brand
                            </option>
                            {device._brands.map(brand =>
                                <option key={brand.id} value={brand.name}>{brand.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-modal__input">
                        <input
                            type="text"
                            placeholder="Input name of device"
                            value={deviceName}
                            onChange={e => setDeviceName(e.target.value)}
                        />
                    </div>
                    <div className="form-modal__input">
                        <input
                            type="number"
                            placeholder="Input price of device"
                            value={devicePrice}
                            onChange={e => setDevicePrice(e.target.value)}
                        />
                    </div>
                    <input
                        style={{marginTop: '20px', color: '#000'}}
                        type="file"
                        onChange={e => setDeviceFile(e.target.files[0])}
                        placeholder="Choose file"
                    />
                    <hr/>
                    <div className="form-modal__new new-form-modal">
						<span className="new-form-modal__btn btn" onClick={addInfo}>
							Add new property
						</span>
                        {info.map(item =>
                            <div className="new-form-modal__row" key={item.id}>
                                <div className="new-form-modal__input form-modal__input">
                                    <input
                                        type="text"
                                        placeholder="Input name"
                                        value={item.title}
                                        onChange={e => changeInfo('title', e.target.value, item.id)}
                                    />
                                </div>
                                <div className="new-form-modal__input form-modal__input">
                                    <input
                                        type="text"
                                        placeholder="Input description"
                                        value={item.description}
                                        onChange={e => changeInfo('description', e.target.value, item.id)}
                                    />
                                </div>
                                <div className="new-form-modal__delete btn" onClick={() => removeInfo(item.id)}>
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>
                    <hr/>
                    <div className="form-modal__footer">
                        <button type="submit" className="form-modal__btn btn">
                            Add new device
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
});

export default Admin;