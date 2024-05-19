import React, {Fragment, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../css/SideBanner.css'

/**
 * @deprecated Use UserConsole() instead
 */
function SideBanner(props:any) {

    console.log(props)

    const [activePage, setActivePage] = useState<number>(props.page);
    const navigate = useNavigate();

    const handleSelectLink = (event:any, page:number, link:string) => {
        event.preventDefault();
        setActivePage(page);
        navigate(link);
    }

    return (
        <Fragment>
            <div className="sidenav">
                <div className={'navLink'}
                     onClick={(event:any) => handleSelectLink(event,0, './../profile')}
                     role={activePage==0?'active':'inactive'}>Profile</div>
                <div className={'navLink'}
                     onClick={(event:any) => handleSelectLink(event,1, './../account')}
                     role={activePage==1?'active':'inactive'}>Account</div>
                <div className={'navLink'}
                     onClick={(event:any) => handleSelectLink(event,2, './../administrator')}
                     role={activePage==2?'active':'inactive'}>Admin</div>
                <div className={'navLink'}
                     onClick={(event:any) => handleSelectLink(event,3, '/login')}
                     role={activePage==3?'active':'inactive'}>Logout</div>
            </div>
        </Fragment>
    );

}

export default SideBanner;