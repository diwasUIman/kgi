import React, { useState, useEffect } from "react";

export function CreateButton(props) {
    return (
        <button type="button" className="btn btn-primary" id="create-order" style={{ marginRight: "20px" }}
            onClick={props.handleBtn}>
            Create Order
        </button>
    )
}

export function CancelButton() {
    return (
        <button type="button" className="btn btn-dark">Cancel</button>
    )
}

export function AddNewButton() {
    return (
        <button className="btn btn-warning col-sm-4"> Add new </button>
    )
}

export function ClearBtn() {
    return (
        <button className="btn btn-warning col-sm-4"> Clear </button>
    )
}