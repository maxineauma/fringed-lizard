import React from "react";
import { Navigate as Redirect } from "react-router-dom";

const Signout = () => {

    localStorage.clear();

    return (
        <>
            <Redirect to="/" />
        </>
    )
}

export default Signout;