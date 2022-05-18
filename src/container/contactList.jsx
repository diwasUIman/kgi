import React, { useState, useEffect } from "react";

export default function ContactListComponent(props) {

    const [supplierList, setsupplierList] = useState([]);
    const [productList, setProductList] = useState([]);

    return (
        <div>
            {props.name} List
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            supplierList.map(item => {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.contact}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}