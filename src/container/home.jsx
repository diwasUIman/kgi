import React, { useState, useEffect } from "react";
import '../App.css';
import SetSalesComponent from '../components/salesComponent';
import DashboardComponent from '../container/dashboard';

function HomeComponent() {

    const [totalSales, setTotalSales] = useState(0);
    const [totalStock, setTotalStock] = useState(0);
    const [totalOrders, setTotalOrder] = useState([]);

    useEffect(() => {

    })

    function addNewOrder(order, sumTotal) {
        // add order info like Customer, Bill info
        setTotalOrder(totalOrders => [...totalOrders, order])
        setTotalSales(totalSales + sumTotal)

    }

    return (
        <div>
            <div className="container-fluid">

                <h4 className="p-2">Dashboard</h4>
                <DashboardComponent totalSales={totalSales}
                    totalStock={totalStock}
                    totalOrders={totalOrders.length}
                />

                <div className="container-fluid">
                    <SetSalesComponent
                        addNewOrder={addNewOrder}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomeComponent;
