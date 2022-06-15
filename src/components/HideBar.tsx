import React, {Fragment} from 'react';
import "./HideBar.css"
import useCollapse from "react-collapsed";
import RequestTable from "./RequestTable";

function HideBar() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    return (
        <Fragment>
            <div className="collapsible">
                <div {...getToggleProps()}>
                    <button>
                        {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                </div>
                <div className="header" {...getCollapseProps()}>
                    <div>
                        <RequestTable/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HideBar;
