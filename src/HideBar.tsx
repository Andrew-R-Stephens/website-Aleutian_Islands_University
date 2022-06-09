import React, { Fragment } from 'react';
import "./HideBar.css"
import useCollapse from "react-collapsed";
import TableRequest from "./TableRequest";

function HideBar() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (
        <Fragment>
            <div className="collapsible">
                <div {...getToggleProps()}>
                    {isExpanded ? 'Collapse' : 'Expand'}
                </div>
                <div className="header" {...getCollapseProps()}>
                    <div>
                        <code>Now you can see the hidden content. <br/><br/>
                            Click again to hide...</code>
                        <TableRequest/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HideBar;
