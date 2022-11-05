import React, { useState, useEffect } from 'react';
import '../App.css';
import OrderListTable from './order-list-table';
import { CustomerDetailsComponent } from './customer-details';

export default function SalesComponent(props) {

    const [currentProduct, setCurrentProduct] = useState({});
    const [productList, setProductList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [customerDetails, setCustomerDetails] = useState({})
    const [errors, setErrors] = useState({});

    /// USEEFFECT CALL HERE ///
    useEffect(() => {

        console.log("firing useEffect...")

        fetch('data/MOCK_DATA.json')
            .then(res => res.json())
            .then(data => setProductList(data.records))
            .catch(error => {
                setErrors({ fetchError: error.toString() });
                console.error('There was an fetch error!', error);
            });
    }, [])
    /// USEEFFECT CALL HERE ///
    useEffect(() => {
        console.log("Firing 2ns useeffect")
        grossAmount = orderList.map(item => item.totalAmount)
            .reduce((prev, curr) => { return prev + curr }, 0);
        // CNAHGED NULL TO 0 above

        document.getElementById("grossAmount").value = grossAmount;

        let VAT = (13 / 100 * grossAmount);
        document.getElementById("VAT").value = VAT;

        netAmount = grossAmount + VAT;
        document.getElementById("netAmount").value = netAmount;

        sumTotal = totalSales + netAmount
    })

    let customerInfo;
    let grossAmount;
    let netAmount;
    let sumTotal;
    let products = productList.map((item, idx) => {
        return (
            <option className="lead" key={idx}> {item.Name} </option>
        )
    });

    function handleProductChange(evt) {
        let result = productList.find(item => {
            return evt.target.value === item.Name;
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
        // console.log("curent product " + JSON.stringify(currentProduct))
        // console.log("order list " + JSON.stringify(orderList))
        if (currentProduct)
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
        customerInfo =  {
            "id": {
                "$oid": document.getElementById("c_ID").value
            },
            "full_name": document.getElementById("full_name").value,
            "email": "",
            "gender": "",
            "address": document.getElementById("c_address").value,
            "phone": document.getElementById("c_phone").value
        }
        console.log("customerInfo ", customerInfo)
        setCustomerDetails(customerInfo);

        if (orderList.length)
            props.addNewOrder(orderList, sumTotal, customerDetails);
        setOrderList([]);

        console.log("customerDetails ", customerDetails)
    }

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

    return (
        <div className="mt-4">
            <form id="sales-form">

                <CustomerDetailsComponent detailType="Customer" />

                <div className="table-responsive pt-4">
                    <div className="my-2"><b>Add Order</b></div>
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
                        <tbody>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">
                                    <select name="products" id="products" className="form-control" defaultValue={'default'}
                                        style={{ width: "100%" }}
                                        onChange={handleProductChange} >
                                        <option disabled hidden value={'default'}> Select a product</option>
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
                                    <button type="button" onClick={handleAdd} className="btn btn-warning">
                                        <b> + </b>
                                    </button>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>

<div>
                <div id="amtDetails" class="table-responsive pt-4 float-rt">
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
                </div>

                <div class="table-responsive pt-4">
                    <button type="button" className="btn btn-primary" id="create-order" style={{ marginRight: "20px" }}
                        onClick={() => handleCreate()}>
                        Create Order
                    </button>
                    <button type="button" className="btn btn-dark" onClick={() => setOrderList([])}>Cancel</button>
                </div>
                
                </div>
            </form>
        </div >
    )
}