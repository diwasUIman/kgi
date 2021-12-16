import React from "react";
import '../App.css';
import SetSalesComponent from '../components/salesComponent';

class HomeComponent extends React.Component {
    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            currentPage : "Sales"
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid">

                    <h4 className="p-2">Dashboard</h4>
                    <div className="container-fluid">
                        <div className="row justify-content-start">
                            <div className="col-md block-style p-2 bg-info text-white">Total Sales</div>
                            <div className="col-md block-style p-2 bg-info text-white">Total Stock</div>
                            <div className="col-md block-style p-2 bg-info text-white">Total Orders</div>
                        </div>
                    </div>

                    <div className="container-fluid">
                        {/* <SalesComponent /> */}
                        <SetSalesComponent />
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeComponent;
