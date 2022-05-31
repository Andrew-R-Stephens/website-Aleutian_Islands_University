import React, {Component} from 'react';
import {testQuery} from './queries.js';

class TestComponent extends Component {

    render() {
        return <p onMouseDown={ testQuery } onMouseUp={ testQuery }>This is a new thing</p>;
    }

}

export default TestComponent;