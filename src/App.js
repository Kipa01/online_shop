import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {useContext, useEffect, useState} from "react";
import Loader from "./components/Loader";
import firebase from "firebase";
import {Context} from "./index";

const App = () => {
    const {user} = useContext(Context)
    const {device} = useContext(Context)
    const {db} = useContext(Context)
    const [loading, setLoading] = useState(true)

    const fetchAuth = () => {
        firebase.auth().onAuthStateChanged(currentUser => {
            if (currentUser) {
                user.setIsAuth(true)
            } else {
                user.setIsAuth(false)
            }
        })
    }

    const fetchTypes = () => {
        let types = []
        db.collection("types")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(s => {
                    types.push(s.data())
                })
                device.setTypes(types)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const fetchBrands = () => {
        let brands = []
        db.collection("brands")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(s => {
                    brands.push(s.data())
                })
                device.setBrands(brands)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const fetchDevices = () => {
        let newDevices = []
        db.collection("devices")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(s => {
                    newDevices.push(s.data())
                })
                device.setDevices(newDevices)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchAuth()
        fetchTypes()
        fetchBrands()
        fetchDevices()

    })

    if (loading) {
        return (
            <Loader/>
        )
    }

    return (
        <BrowserRouter>
            <Navbar/>
            <AppRouter/>
        </BrowserRouter>
    );
};

export default App;
