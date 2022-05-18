import React, { useState, useEffect } from "react";

export function CreateButton(props) {

    return (
        <button type="button" className="btn btn-primary" id="create-order" style={{ marginRight: "20px" }}
            onClick={props.handleCreate}>
            Create Order
        </button>
    )
}

export function CancelButton(props) {

    return (
        <button type="button" className="btn btn-dark">Cancel</button>
    )
}

export function AddNewButton(props) {

    return (
        <button className="btn btn-warning col-sm-4"> Add new </button>
    )
}