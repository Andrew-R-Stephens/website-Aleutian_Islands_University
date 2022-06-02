import React, {Component} from 'react';
import axios from 'axios';

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
            <p>{this.state.persons}</p>
        )
    }

}

export default TestComponent;