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