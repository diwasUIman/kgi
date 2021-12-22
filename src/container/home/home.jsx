import React, { useState, useEffect } from 'react';
import '../../App.css';
import SalesComponent from '../../container/salesComponent';
import DashboardComponent from '../../components/dashboard';

function HomeComponent() {

    const [totalSales, setTotalSales] = useState(0);
    const [totalInventory, setTotalInventory] = useState([
        {
            id: 1,
            name: "Product 1",
            catagory: "",
            inventory: 1000
        },
        {
            id: 2,
            name: "Product 2",
            catagory: "",
            inventory: 1000
        },
        {
            id: 3,
            name: "Product 3",
            catagory: "",
            inventory: 1000
        },
        {
            id: 4,
            name: "Product 4",
            catagory: "",
            inventory: 1000
        },
        {
            id: 5,
            name: "Product 5",
            catagory: "",
            inventory: 1000
        },
    ]);
    const [totalOrders, setTotalOrder] = useState([]);

    useEffect(() => {
    })

    function addNewOrder(order, sumTotal) {
        // add order info like Customer, Bill info
        setTotalOrder(totalOrders => [...totalOrders, order])
        setTotalSales(totalSales + sumTotal)
        handleInventory(order);
    }

    function handleInventory(sale) {
        sale.forEach(order => {
            totalInventory.find(product => {
                if (product.id && product.id === order.id) {
                    product.inventory = product.inventory - order.quantity;
                }
                console.log("totalInventory after ", totalInventory)
            })
        });
    }

    return (
        <div>
            <nav class="navbar navbar-dark bg-dark">
                <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company Name</a>
                <ul class="navbar-nav px-3">
                    <li class="nav-item text-nowrap">
                        <a class="nav-link" href="#">Sign out</a>
                    </li>
                </ul>
            </nav>

            <div className="container-fluid">
                <div class="col-md-2 d-none d-md-block bg-light sidebar">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Orders</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Reports</a>
                        </li>
                    </ul>
                </div>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="pt-3 pb-2 mb-3">
                        <DashboardComponent totalSales={totalSales}
                            totalOrders={totalOrders.length} />

                        <SalesComponent addNewOrder={addNewOrder} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default HomeComponent;