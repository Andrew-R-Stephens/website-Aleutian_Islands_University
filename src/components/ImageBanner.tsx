import '../css/ImageBanner.css'

import React, {Fragment} from 'react';
import {useNavigate} from "react-router-dom";

function ImageBanner(props: any) {
        const {className} = props;

        const navigate = useNavigate();

        function doNavigate(url:string) {
            navigate(url);
        }

        return (
            <Fragment>
                <header>
                    <img className={className} alt="logo" onClick={() => doNavigate('/')} src={''}></img>
                </header>
            </Fragment>
        );
    }

export default ImageBanner;