import React from 'react';

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__body">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;