import React, {Fragment, useState} from "react";
import {AuthRole} from "../../../../stores/AuthUserStore";

function DisplayOtherUser(props:any) {
    const{targetUID, godRole} = props;

    const[userID, setUserID] = useState<any>(targetUID);
    const[viwerRole, setViewerRole] = useState<any>(godRole);

    function displayAsRole() {
        switch(viwerRole) {
            case AuthRole.Faculty: {
                return displayAsFaculty();
            }
            case AuthRole.Administrator: {
                return displayAsAdministrator();
            }
            default: {
                return <Fragment/>;
            }
        }
    }

    function displayAsFaculty() {
        return(
            <Fragment>

            </Fragment>
        );
    }

    function displayAsAdministrator() {
        return(
            <Fragment>

            </Fragment>
        );
    }

    return (
        <Fragment>

        </Fragment>
    );
}

export default DisplayOtherUser;