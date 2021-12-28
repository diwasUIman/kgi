import React, { useState, useEffect } from 'react';
import '../App.css';
import OrderForm from '../components/order-form';
import DashboardComponent from './dashboard';

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
    const [orderList, setOrderList] = useState([])

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
                // console.log("totalInventory after ", totalInventory)
            })
        });
    }

    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0 px-3" href="#">Company Name</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" href="#">Sign out</a>
                    </li>
                </ul>
            </nav>

            <div className="container-fluid">
                <div className="col-md-2 d-none d-md-block bg-light sidebar">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Orders</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Suppliers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Customers</a>
                        </li>
                    </ul>
                </div>

                <main className="col-md-9 ms-sm-auto col-lg-10">
                    <div className="pt-3 pb-2 mb-3">
                        {/* <DashboardComponent
                            totalSales={totalSales}
                            totalOrders={totalOrders.length}
                            addNewOrder={addNewOrder}
                             /> */}

                        <OrderForm/>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default HomeComponent;