import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Typebar = observer(() => {
    const {device} = useContext(Context)
    const [activeId, setActiveId] = useState("")

    const changeActiveId = (type) => {
        if (type.id === activeId) {
            device.setSelectedType({})
            setActiveId("")
        } else {
            device.setSelectedType(type)
            setActiveId(type.id)
        }
    }

    return (
        <div className="shop__types types">
            <div className="types__title">
                Types
            </div>
            <div className="types__list">
                {device._types.map((type) =>
                    <div
                        key={type.id}
                        className={type.id === activeId ? "types__item active" : "types__item"}
                        onClick={() => changeActiveId(type)}
                    >
                        {type.name}
                    </div>
                )}
            </div>
        </div>
    );
});

export default Typebar;