import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'html-react-parser';

class TestComponent extends Component {

    state = {
        persons: ""
    }

    componentDidMount() {
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
            <div>{ ReactHtmlParser(this.state.persons) }</div>
        )
    }

}

export default TestComponent;