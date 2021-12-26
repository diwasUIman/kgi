import React from 'react';
import '../App.css';
import '../style/form-style.css';

export default function OrderListTable(props) {

    return (
        <tbody>
            {props.orderList.map((item, idx) => {
                return (
                    <tr key={idx}>
                        <td className="px-3"> {idx + 1} </td>
                        <td> {item.name} </td>
                        <td> {item.quantity} </td>
                        <td style={{ textAlign: "right" }}> {item.rate} </td>
                        <td style={{ textAlign: "right" }}> {item.totalAmount} </td>
                        <td style={{ textAlign: "right" }}>
                            <button type="button" className="btn btn-danger" onClick={() => props.handleRemove(idx)}>
                                <b>-</b>
                            </button>
                        </td>
                    </tr>
                )
            })
            }
        </tbody>
    )
}