import React, {Component, Fragment} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser';
import './App.css';

class TableRequest extends Component {

    state = {
        persons: "<p>This is a fragment placeholder</p>"
    }

    /*
    componentDidMount() {

    }
    */

    doQuery() {
        //console.log(testQuery());
        axios.get(process.env.REACT_APP_API_URL+"/queries.php")
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
                console.log(persons)
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

export default TableRequest;