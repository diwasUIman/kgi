import React, { useEffect, useState } from "react";
import '../style/form-style.css';
import { AddNewButton } from './button';

export function CompanyInfoComponent(props) {
    // get this info to have a default value outside
    const [fullInfo, setFullInfo] = useState([]);

    useEffect(() => {

    })

    return (
        <th>
            <div className="form-group row pt-1">
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="name" placeholder={`${props.name} Name`} />
                </div>
            </div>
            {props.name === "Supplier" ?
                <div className="form-group row pt-1">
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="vat" placeholder={`VAT No.`} />
                    </div>
                </div> : ""}
            <div className="form-group row pt-1">
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="address" placeholder={`${props.name} Address`} />
                </div>
            </div>
            <div className="form-group row pt-1">
                <div className="col-sm-8">
                    <input type="number" className="form-control" id="contact" placeholder="Contact" />
                </div>
                <AddNewButton name={props.name}/>
            </div>
        </th>
    )
}