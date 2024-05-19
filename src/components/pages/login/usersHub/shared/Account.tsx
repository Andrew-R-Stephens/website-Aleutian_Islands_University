import React, {Fragment} from 'react';
import '../../../../../css/Account.css';
import EditPassword from "./EditPassword";

/**
 * The private, inwards-facing data for a specific user.
 * @constructor
 */
function Account() {

    return (
        <Fragment>
            <div className={'main-container'}>
                <div className={'main-body'}>
                    <div className = {'inner-body'}>
                        <div className={'inner-body-constraints'}>\
                            <EditPassword/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Account;