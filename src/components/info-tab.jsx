import React from "react";
import '../style/form-style.css';

export function CompanyInfoComponent(props) {

    return (
        <th>
            <div className="form-group row">
                <div className="">
                    <input type="text" className="form-control" id="name" placeholder={`${props.name} Name`} />
                </div>
            </div>
            <div className="form-group row pt-2">
                <div className="">
                    <input type="text" className="form-control" id="nddress" placeholder={`${props.name} Address`} />
                </div>
            </div>
            <div className="form-group row pt-2">
                <div className="">
                    <input type="number" className="form-control" id="phone" placeholder="Phone" />
                </div>
            </div>
        </th>

    )
}