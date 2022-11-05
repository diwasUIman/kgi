import React, {useState, useEffect} from "react";
import '../style/form-style.css';
import {DateComponent} from './dateComponent';
import { CustomerDetailsComponent } from './customer-details';
import {CreateButton} from './button';
import OrderListTable from './order-list-table';

export default function OrderFormComponent() {

    const [supplyOrderList, setSupplyOrderList] = useState([]);
    const [desc, setDesc] = useState("");
    const [qty, setQty] = useState("");
    const [rt, setRt] = useState("");
    const [amt, setAmt] = useState("");
    const [subTotal, setSubTotal] = useState("");

    function handleAdd() {
        let newEntry = {
            name: desc,
            quantity: qty,
            rate: rt,
            totalAmount: amt
        }

        setSupplyOrderList(supplyOrderList => [...supplyOrderList, newEntry]);
        resetOrder();
    }

    function handleRemove(key) {
        setSupplyOrderList(supplyOrderList.filter((item, ind, arr) => arr.indexOf(item) !== key))
    }

    function handleCreate(){
        console.log(supplyOrderList)
    }

    function resetOrder() {
        document.getElementById("orderDesc").value = "";
        document.getElementById("orderQty").value = "";
        document.getElementById("orderRt").value = "";
        document.getElementById("amountTotal").value = "";
    }

    useEffect(() => {
        let total = document.getElementById("orderQty").value * document.getElementById("orderRt").value;
        setAmt(total)
        let subTotal = supplyOrderList.map(item => item.totalAmount).reduce((p, c) => {
            return p + c
        }, 0);
        setSubTotal(subTotal)
    })

    return (
        <div className="mt-4">
            <div className="my-2"><b>Order List Form</b></div>
            <form id="order-form">

                <DateComponent />

                <table className="mb-2">
                    {/* Customer information */}
                    {/* <CustomerDetailsComponent name="Customer"/> */}

                    <th style={{ width: "40%" }}></th>

                    {/* Supplier information */}
                    <CustomerDetailsComponent name="Supplier"/>
                </table>


                <div className="table-responsive pt-4">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "10%" }}>Sn. No.</th>
                                <th scope="col">Description</th>
                                <th scope="col">Qty</th>
                                <th scope="col" className="form-input-rt">Rate</th>
                                <th scope="col" className="form-input-rt">Amount</th>
                            </tr>
                        </thead>

                        {/* Orderlist here */}
                        <OrderListTable orderList={supplyOrderList}
                            handleRemove={handleRemove}
                        />

                        <tbody>
                            <tr className="text-right">
                                <th scope="col"></th>
                                <th scope="col">
                                    <input type="text" id="orderDesc" className="form-control"
                                        onChange={e => setDesc(e.target.value)}
                                    />
                                </th>
                                <th scope="col" className="input-sm">
                                    <input type="number" id="orderQty" className="form-control"
                                        style={{ width: "100%" }}
                                        onChange={e => setQty(e.target.value)}
                                    />
                                </th>
                                <th scope="col" className="input-sm">
                                    <input type="text" id="orderRt" className="form-control form-input-rt"
                                        onChange={e => setRt(e.target.value)}
                                    />
                                </th>
                                <th scope="col" className="input-sm">
                                    <input type="text" id="amountTotal" className="form-control form-input-rt input-full"
                                        value={amt}
                                    />
                                </th>
                                <th scope="col" className="form-input-rt">
                                    <button type="button" onClick={handleAdd} className="btn btn-warning">
                                        <b> + </b>
                                    </button>
                                </th>
                            </tr>

                            <tr className="my-3">
                                <td colSpan="6" className="form-input-rt">
                                    <div>
                                        <label className="mr-3"> SUBTOTAL </label>
                                        <input type="number" className="mx-2 form-input-rt"
                                            id="subTotal"
                                            value={subTotal}
                                            disabled
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <CreateButton handleCreate={handleCreate}/>
            </form>
        </div>
    )
}