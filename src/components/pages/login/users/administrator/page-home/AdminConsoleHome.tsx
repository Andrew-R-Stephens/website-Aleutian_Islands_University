import React, {Fragment, useEffect, useState} from 'react';
import './../../../../../../css/AdminConsoleHome.css';

function AdminConsoleHome() {

    const [activePage, setActivePage] = useState(0);

    return (
        <Fragment>
            <div style={{margin:"auto"}}>
                <h1>Welcome to the Admin Console</h1>
                <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                    <div className={'page-bubble'}>
                        <label className={'page-bubble-label'}>Manage Master Schedule</label>
                    </div>
                    <div className={'page-bubble'}>
                        <label className={'page-bubble-label'}>Manage Course Catalog</label>
                        <div className={'page-bubble-description'}>A console which is used for altering data within the Official Course Catalog.</div>
                    </div>
                    <div className={'page-bubble'}>
                        <label className={'page-bubble-label'}>Manage Users</label>
                        <div className={'page-bubble-description'}>A console which is used for editing the properties of User accounts, Registration, etc.</div>
                    </div>
                </div>
                <div style={{display:"flex", marginTop:32, marginBottom:32}}>
                    <div className={'page-bubble'}>
                        <label className={'page-bubble-label'}></label>
                    </div>
                    <div className={'page-bubble'}>
                        <label className={'page-bubble-label'}></label>
                    </div>
                    <div className={'page-bubble'}>
                        <label className={'page-bubble-label'}></label>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}

export default AdminConsoleHome;