import React from "react";
import '../App.css';

export default function DashboardComponent(props) {

    return (
        <div className="container-fluid">
            <div className="row justify-content-start">
                <div className="col-md block-style p-2 bg-dark text-white">
                    <h6>Total Sales</h6>
                    <h3> { props.totalSales }</h3>
                </div>
                <div className="col-md block-style p-2 bg-dark text-white">
                    <h6>Total Stock</h6>
                    <h3> {props.totalStock} </h3>
                </div>
                <div className="col-md block-style p-2 bg-dark text-white">
                    <h6>Total Orders</h6>
                    <h3> {props.totalOrders} </h3>
                </div>
            </div>
        </div>
    )
}