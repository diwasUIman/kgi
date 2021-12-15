import React from 'react';
import '../App.css';

class SalesComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            item_num: 1,
            productList: [
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

                },
            ],
            currentSelection:
            {
                id: null,
                catagory: "",
                name: "",
                rate: null,
                quantity: null
            }
        }
        this.handleProductChange = this.handleProductChange.bind(this);
    }

    handleProductChange(evt) {
        console.log(evt.target.value)
        let selected = {
            id: null,
            catagory: "",
            name: evt.target.value,
            rate: document.getElementById("rate").value,
            quantity: null
        }
        this.setState({
            currentSelection : selected
        })

        console.log(this.state)
    }

    render() {
        let productList = this.state.productList.map(item => {
            return (
                <option className="lead"> {item.name} </option>
            )
        })


        return (
            <div className="">
                <div className="margin-top"><b>Add Order</b></div>
                <form onSubmit={this.handleSubmit}>
                    {/* <div><b><label> Date : <span></span></label></b></div> */}

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
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col" style={{ textAlign: "right" }}>Rate</th>
                                            <th scope="col" style={{ textAlign: "right" }}>Amount</th>
                                        </tr>
                                    </thead>

                                    {/* Product Selection here */}
                                    <thead>
                                        <tr>
                                            <th scope="col">{this.state.item_num}</th>
                                            <th scope="col col-6">
                                                <select name="products" id="products"
                                                        style={{ width: "100%" }}
                                                        onChange={this.handleProductChange}>
                                                    <option hidden disabled selected value> Select a Product </option>
                                                    {productList}
                                                </select>
                                            </th>
                                            <th scope="col" style={{ width: "100px" }}>
                                                <input type="number" id="quantity" style={{ width: "100%" }} />
                                            </th>
                                            <th scope="col" style={{ textAlign: "right" }}>
                                                <label className="lead" id="rate"> {this.state.currentSelection.rate ?? ""} </label>
                                            </th>
                                            <th scope="col" style={{ textAlign: "right" }}>
                                                <label className="lead" id="amount">
                                                    {this.state.currentSelection.rate * this.state.currentSelection.quantity}
                                                </label>
                                            </th>
                                            <th scope="col" style={{ textAlign: "right" }}>
                                                <button type="button" onClick={this.handleAdd} className="btn btn-dark"><b>+</b>
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
                                    <label> Gross Amount </label>
                                    <input type="number" className="margin-top" id="grossAmount" disabled />
                                </div>
                                <div>
                                    <label> VAT 9% </label>
                                    <input type="number" className="margin-top" id="VAT" disabled />
                                </div>
                                <div>
                                    <label> Discount </label>
                                    <input type="number" className="margin-top" id="discountAmount" />
                                </div>
                                <div>
                                    <label> Net Amount </label>
                                    <input type="number" className="margin-top" id="netAmount" disabled />
                                </div>
                            </td>
                        </tr>
                    </table>
                    <input type="submit" value="Create Order" className="btn btn-primary" />
                </form>
            </div>
        )
    }
}

export default SalesComponent;

