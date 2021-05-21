import React from 'react';
import ReactDom from 'react-dom';

export default class Page1 extends React.Component {
    state = {
        a: 3
    }
    render() {
        return <div>
            <button onClick={() => {
                this.setState({a: ++this.state.a})
            }}>test</button>
            {this.state.a}
        </div>
    }
}
