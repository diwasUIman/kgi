import React from "react";
import '../App.css';
import SalesComponent from '../components/salesComponent';

export default function DashboardComponent(props) {

    return (
        <div className="container-fluid">
            <div className="row">
                <h3>Dashboard</h3>
                <div className="card text-white bg-dark m-2 col-md">
                    <div className="p-2">
                        <p>Total Sales </p>
                        <h3 className="card-text"> {props.totalSales}</h3>
                    </div>
                </div>
                <div className="card text-white bg-dark m-2 col-md">
                    <div className="p-2">
                        <p>Total Stock </p>
                    </div>
                </div>
                <div className="card text-white bg-dark m-2 col-md">
                    <div className="p-2">
                        <p>Total Orders </p>
                        <h3> {props.totalOrders}</h3>
                    </div>
                </div>
            </div>

            <SalesComponent addNewOrder={props.addNewOrder} />
        </div>
    )
}