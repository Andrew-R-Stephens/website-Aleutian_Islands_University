import React, { Fragment} from 'react';
import {Link} from "react-router-dom";
import '../css/SideBanner.css'


function SideBanner(props:any) {

    const { urls = [""], names = [""], classes = [""], roles = [""]} = props;

    const listItems = urls.map((elem:any, index:number) =>
        <Link className={classes[index]} role={roles[index]} key={index} to={urls[index]} >
            {names[index]}
        </Link>
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