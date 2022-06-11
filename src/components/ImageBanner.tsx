import './ImageBanner.css'

import React, {Fragment} from 'react';

    function ImageBanner(props: any) {
        const {className} = props;

        return (
            <Fragment>
                <header>
                    <img className={className} alt="logo" />
                </header>
            </Fragment>
        );
    }

export default ImageBanner;