import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import '../css/HomeNavBanner.css';

function HomeNavBanner(props:any) {

    const {urls, names} = props;

    const listItems = urls.map((elem:any, index:number) =>
        <li key={index}><Link to={urls[index]}>{names[index]}</Link></li>
    );

    return (
        <Fragment>
            <header className={'nav-header'}>
            <ul>
                {listItems}
            </ul>
            </header>
        </Fragment>
    );
}

export default HomeNavBanner;