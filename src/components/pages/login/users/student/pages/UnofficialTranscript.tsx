import {Fragment, useEffect, useState} from "react";
import {RoleAuthStore, UserAuthStore} from "../../../../../../stores/AuthUserStore";

function UnofficialTranscript(props:any) {

    const {targetUID, targetRole} = props;

    const userStoreID = UserAuthStore((state:any) => state.userID);
    const userStoreRole = RoleAuthStore((state:any) => state.authRole);
    const [userID, setID] = useState(userStoreID);
    const [userRole, setUserRole] = useState(userStoreRole);

    useEffect(() => {
        if(targetRole && targetUID) {
            setUserRole(targetRole+"");
            setID(targetUID);
            console.log(targetUID, targetRole)
        }
    }, [targetUID && targetRole])



    return <Fragment/>
}

export default UnofficialTranscript;