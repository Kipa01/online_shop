import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Brandbar = observer(() => {
    const {device} = useContext(Context)
    const [activeId, setActiveId] = useState("")

    const changeActiveId = (brand) => {
        if (brand.id === activeId) {
            device.setSelectedBrand({})
            setActiveId("")
        } else {
            device.setSelectedBrand(brand)
            setActiveId(brand.id)
        }
    }
    return (
        <div className="shop__brands brands-shop">
            {device._brands.map(brand =>
                <div
                    key={brand.id}
                    onClick={() => changeActiveId(brand)}
                    className={brand.id === activeId ? "brands-shop__item btn active" : "brands-shop__item btn"}
                >
                    {brand.name}
                </div>
            )}
        </div>
    );
});

export default Brandbar;