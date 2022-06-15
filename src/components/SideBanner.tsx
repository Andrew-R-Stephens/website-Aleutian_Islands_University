import React, { Fragment} from 'react';
import {Link} from "react-router-dom";
import './SideBanner.css'


function SideBanner(props:any) {

    const {urls = [""], names = [""], id = ""} = props;

    const listItems = urls.map((elem:any, index:number) =>
        <Link key={index} to={urls[index]} state={{id}}>{names[index]}</Link>
    );

    return (
        <Fragment>
            <div className="sidenav">
                {listItems}
            </div>
        </Fragment>
    );
}

export default SideBanner;