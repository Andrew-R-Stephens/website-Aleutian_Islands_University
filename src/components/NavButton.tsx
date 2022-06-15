import React from 'react';
import {useNavigate} from "react-router-dom";
import "./NavButton.css";

function NavButton(props: any) {
    let navigate = useNavigate();

    return <button onClick={() => navigate(props.url)}>
        {props.title}
    </button>
}

export default NavButton;