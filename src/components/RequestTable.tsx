import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser';
import './RequestTable.css';

class RequestTable extends Component {

    state = {
        persons: "<p>This is a fragment placeholder</p>"
    }

    doQuery() {
        axios.get(process.env.REACT_APP_API_URL+"/queries.php")
            .then(response => {
                const persons = response.data;
                this.setState({ persons });
            }).catch(function(err) {
            console.log(err.message);
        })
    }

    render() {
        return (
            <div>
                { ReactHtmlParser(this.state.persons) }
                <button onMouseDown={() => this.doQuery()}>Do Query!</button>
            </div>
        )
    }

}

export default RequestTable;