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
    console.log("You have changed a thing");
  }

  render() {
    console.log(this.props.searchDataAPI + this.state.search)
    return (
      <div>
      <input type="text"
          value={this.state.search}
          onChange = {this.updateSearch.bind(this)}/>
      </div>
    )
  }
}


export default Search
