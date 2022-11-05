import React from 'react';
import '../App.css';

export function DateComponent() {
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return (
        <div className="mb-2 px-3">
            <label> Date : {`${month} / ${day} / ${year}`}</label>
        </div>
    )
}
