import React, { Component } from 'react';

class query extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this.updatequery = this.updatequery.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updatequery(event) {
    this.setState({query: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.state);
    this.setState({ query: "" });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text"
              value={this.state.query}
              onChange={this.updatequery}/>
        </form>
      </div>
    )
  }
}


export default query
