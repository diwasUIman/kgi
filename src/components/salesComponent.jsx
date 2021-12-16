import React, { useState, useEffect } from 'react';
import '../App.css';
import OrderListTable from './orderListTable';

export default function SetSalesComponent() {

    const [currentProduct, setCurrentProduct] = useState({})
    const [productList, setList] = useState([
        {
            id: 1,
            catagory: "",
            name: "Product 1",
            rate: 100,

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

    function handleRemove(key){
        setOrderList(orderList.filter((item,ind,arr) => arr.indexOf(item) !== key))
    }

    function resetOrder() {
        document.getElementById("products").value = "";
        document.getElementById("quantity").value = "";
        setCurrentProduct({})
    }

    let grossAmount;

    function handleDiscount(evt) {
        let discount = evt.target.value;
        let VAT = (13/100 * grossAmount);
        let netAmount = grossAmount + VAT;

        if(evt.target.value.includes("%")) {
            let discount_percent = Number(discount.replace(/\D/g,''));
            discount = discount_percent / 100 * netAmount;
            document.getElementById("netAmount").value = netAmount - discount;
        }
        document.getElementById("netAmount").value = netAmount - discount;
    }

    useEffect(() => {
        grossAmount = orderList.map(item => item.totalAmount)
                               .reduce((prev,curr) => { return prev + curr}, null);

        document.getElementById("grossAmount").value = grossAmount;

        let VAT = (13/100 * grossAmount);
        document.getElementById("VAT").value = VAT;

        document.getElementById("netAmount").value = grossAmount + VAT;

        console.log("Newlist ", orderList)
    })

    let products = productList.map((item, idx) => {
        return (
            <option className="lead" key={idx}> {item.name} </option>
        )
    });

    return (
        <div className="">
            <div className="margin-top"><b>Add Order</b></div>
            <form>
                <table style={{ width: "100%" }}>

                    {/* Customer information */}
                    <tr>
                        <th colSpan="3">
                            <div className="form-group row margin-top">
                                <label for="cName" className="col-sm-3 col-md-2 col-form-label">Customer Name</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="cName" />
                                </div>
                            </div>

                            <div className="form-group row margin-top">
                                <label for="cAddress" className="col-sm-3 col-md-2 col-form-label">Customer Address</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="cAddress" />
                                </div>
                            </div>

                            <div className="form-group row margin-top">
                                <label for="cPhone" className="col-sm-3 col-md-2 col-form-label">Customer Phone</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="cPhone" />
                                </div>
                            </div>
                        </th>
                    </tr>

                    <tr>
                        <td colSpan="3">
                            <table className="table">
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

                                <thead>
                                    {/* Product Add Selection here */}
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col col-6">
                                            <select name="products" id="products"
                                                style={{ width: "100%" }}
                                                onChange={handleProductChange} >
                                                <option hidden disabled selected value> Select a Product </option>
                                                {products}
                                            </select>
                                        </th>
                                        <th scope="col" style={{ width: "100px" }}>
                                            <input type="number" id="quantity"
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
                                            <button type="button" onClick={handleAdd} className="btn btn-dark"><b>+</b>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </td>
                    </tr>
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
                                onChange={(e) => handleDiscount(e)}/>
                            </div>
                            <div>
                                <label style={{ marginRight: "20px" }}> Net Amount </label>
                                <input type="number" className="margin-top" id="netAmount" style={{ textAlign: "right" }} disabled />
                            </div>
                        </td>
                    </tr>
                </table>
                <input type="" value="Create Order" className="btn btn-primary" />
            </form>
        </div>
    )
}