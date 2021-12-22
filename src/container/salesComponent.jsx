import React, { useState, useEffect } from 'react';
import '../App.css';
import OrderListTable from '../components/orderListTable';

export default function SalesComponent(props) {

    const [currentProduct, setCurrentProduct] = useState({})
    const [productList, setList] = useState([
        {
            id: 1,
            catagory: "",
            name: "Product 1",
            rate: 88.5,

        },
        {
            id: 2,
            catagory: "",
            name: "Product 2",
            rate: 15,

        },
        {
            id: 3,
            catagory: "",
            name: "Product 3",
            rate: 100,

        },
        {
            id: 4,
            catagory: "",
            name: "Product 4",
            rate: 50,

        },
        {
            id: 5,
            catagory: "",
            name: "Product 5",
            rate: 10,

        }
    ])
    const [orderList, setOrderList] = useState([])
    const [totalSales, setTotalSales] = useState(0)

    function handleProductChange(evt) {
        let result = productList.find(item => {
            return evt.target.value === item.name;
        })
        setCurrentProduct(result);
        document.getElementById("quantity").value = "";
    }

    function handleTotal() {
        let quantity = document.getElementById("quantity").value;
        if (quantity) {
            setCurrentProduct({ ...currentProduct, totalAmount: quantity * currentProduct.rate, quantity: Number(quantity) })
        }
    }

    function handleAdd() {
        setOrderList(orderList => [...orderList, currentProduct]);
        resetOrder();
    }

    function handleRemove(key) {
        setOrderList(orderList.filter((item, ind, arr) => arr.indexOf(item) !== key))
        document.getElementById("discountAmount").value = "";
    }

    function resetOrder() {
        document.getElementById("products").value = "";
        document.getElementById("quantity").value = "";
        setCurrentProduct({})
    }

    function handleCreate() {
        props.addNewOrder(orderList, sumTotal);
        setOrderList([])
    }

    let grossAmount;
    let netAmount;
    let sumTotal;

    function handleDiscount(evt) {
        let discount = evt.target.value;
        let VAT = (13 / 100 * grossAmount);
        let netAmount = grossAmount + VAT;

        if (evt.target.value.includes("%")) {
            let discount_percent = Number(discount.replace(/\D/g, ''));
            discount = discount_percent / 100 * netAmount;
            document.getElementById("netAmount").value = netAmount - discount;
        }
        document.getElementById("netAmount").value = netAmount - discount;
    }

    useEffect(() => {
        grossAmount = orderList.map(item => item.totalAmount)
            .reduce((prev, curr) => { return prev + curr }, null);

        document.getElementById("grossAmount").value = grossAmount;

        let VAT = (13 / 100 * grossAmount);
        document.getElementById("VAT").value = VAT;

        // REMOVE FLOOR HERE FOR PROD
        // *************************
        // REMOVE FLOOR HERE FOR PROD
        netAmount = Math.floor(grossAmount + VAT);
        document.getElementById("netAmount").value = netAmount;

        sumTotal = totalSales + netAmount
    })

    let products = productList.map((item, idx) => {
        return (
            <option className="lead" key={idx}> {item.name} </option>
        )
    });

    return (
        <div className="mt-4">
            <div className="margin-top"><b>Add Order</b></div>
            <form id="sales-form">
                {/* Customer information */}
                <div class="form-group row">
                    <label for="cName" class="col-sm-2 col-form-label">Customer Name</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="cName" placeholder="" />
                    </div>
                </div>
                <div class="form-group row pt-2">
                    <label for="cAddress" class="col-sm-2 col-form-label">Customer Address</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="cAddress" placeholder="" />
                    </div>
                </div>
                <div class="form-group row pt-2">
                    <label for="cAddress" class="col-sm-2 col-form-label">Customer Phone</label>
                    <div class="col-sm-3">
                        <input type="number" class="form-control" id="cPhone" placeholder="" />
                    </div>
                </div>

                <div className="table-responsive pt-4">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Qty</th>
                                <th scope="col" style={{ textAlign: "right" }}>Rate</th>
                                <th scope="col" style={{ textAlign: "right" }}>Amount</th>
                            </tr>
                        </thead>

                        {/* Orderlist here */}
                        <OrderListTable orderList={orderList}
                            handleRemove={handleRemove}
                        />

                        {/* Product Add Selection here */}
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">
                                <select name="products" id="products" className="form-control"
                                    style={{ width: "100%" }}
                                    onChange={handleProductChange} >
                                    <option hidden disabled selected value> Select a Product </option>
                                    {products}
                                </select>
                            </th>
                            <th scope="col" style={{ width: "100px" }}>
                                <input type="number" id="quantity" className="form-control"
                                    style={{ width: "100%" }}
                                    onChange={handleTotal} />
                            </th>
                            <th scope="col" style={{ textAlign: "right" }}>
                                <label className="lead" id="rate">
                                    {currentProduct.rate}
                                </label>
                            </th>
                            <th scope="col" style={{ textAlign: "right" }}>
                                <label className="lead" id="amount">
                                    {currentProduct.totalAmount}
                                </label>
                            </th>
                            <th scope="col" style={{ textAlign: "right" }}>
                                <button type="button" onClick={handleAdd} className="btn btn-warning" style={{width:"40%"}}>
                                    <b> + </b>
                                </button>
                            </th>
                        </tr>
                    </table>
                </div>

                <table style={{ width: "100%" }}>
                    <tr>
                        <td colSpan="3" style={{ textAlign: "right" }}>
                            <div>
                                <label style={{ marginRight: "20px" }}> Gross Amount </label>
                                <input type="number" className="margin-top" id="grossAmount" style={{ textAlign: "right" }} disabled />
                            </div>
                            <div>
                                <label style={{ marginRight: "20px" }}> VAT 13% </label>
                                <input type="number" className="margin-top" id="VAT" style={{ textAlign: "right" }} disabled />
                            </div>
                            <div>
                                <label style={{ marginRight: "20px" }}> Discount </label>
                                <input type="string" className="margin-top" id="discountAmount" style={{ textAlign: "right" }}
                                    onChange={(e) => handleDiscount(e)} />
                            </div>
                            <div>
                                <label style={{ marginRight: "20px" }}> Net Amount </label>
                                <input type="number" className="margin-top" id="netAmount" style={{ textAlign: "right" }} disabled />
                            </div>
                        </td>
                    </tr>
                </table>
                <button type="button" className="btn btn-primary" id="create-order" style={{ marginRight: "20px" }}
                    onClick={() => handleCreate()}>
                    Create Order
                </button>
                <button type="button" className="btn btn-dark" onClick={() => setOrderList([])}>Cancel</button>
            </form>
        </div >
    )
}