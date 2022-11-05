import React, { useEffect, useState } from "react";
import '../style/form-style.css';
import { AddNewButton, ClearBtn } from './button';

export function CustomerDetailsComponent(props) {
    // get this info to have a default value outside
    const [currentDetail, setCurrentDeail] = useState({
        "id": {
            "$oid": ""
        },
        "full_name": "",
        "email": "",
        "gender": "",
        "address": "",
        "phone": null
    }
    );
    const [userFound, setUserFound] = useState(false)

    useEffect(() => {
    });

    let btnTitle = userFound ? "Clear" : "Add New";

    function handleIdChange(evt) {
        if (evt.target.value.length === 10) {
            // console.log("ID is " + evt.target.value);
            fetch('data/mock_customers.json')
                .then(res => res.json())
                .then(data => {
                    data.records.find(item => {
                        if (item.phone === evt.target.value.toString()) {
                            setCurrentDeail(item);
                            setUserFound(true)
                            console.log(item.full_name + " Found!")
                            return item;
                        } else {
                            console.log("User not found")
                        }
                    })
                }).then((details) => console.log(currentDetail))
        }
    }

    function handleCLear() {
        document.getElementById("custID").value = "";
    }

    return (
        <div>
            Customer information
            <div className="form-group row pt-1">
                <div className="col-sm-10">
                    <input type="id" className="form-control" id="c_ID" placeholder={`${props.detailType} ID`}
                        value={currentDetail.id["$oid"]}
                    />
                </div>
            </div>
            <div className="form-group row pt-1">
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="full_name" placeholder={`${props.detailType} Name`}
                        value={currentDetail.full_name}
                    />
                </div>
            </div>
            {props.detailType === "Supplier" ?
                <div className="form-group row pt-1">
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="vat" placeholder={`VAT No.`} />
                    </div>
                </div> : ""}
            <div className="form-group row pt-1">
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="c_address" placeholder={`${props.detailType} Address`}
                        value={currentDetail.address}
                    />
                </div>
            </div>
            <div className="form-group row pt-1">
                <div className="col-sm-8 col-md-4">
                    <input type="tel" className="form-control" id="c_phone" placeholder="Phone No." maxLength={10}
                        value={currentDetail.phone}
                        onChange={(e) => handleIdChange(e)} />
                </div>

                {userFound ? <ClearBtn onClick={() =>setCurrentDeail({})} /> : <AddNewButton />}
            </div>
        </div>
    )
}