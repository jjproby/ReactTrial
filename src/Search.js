import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.search);
    this.setState(search: "");
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}
        <input type="text"
            value={this.state.search}
            onChange = {this.updateSearch.bind(this)}/>
        </form>
      </div>
    )
  }
}


export default Search
