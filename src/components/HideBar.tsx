import React, {Fragment} from 'react';
import "../css/HideBar.css"
import useCollapse from "react-collapsed";

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

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HideBar;
