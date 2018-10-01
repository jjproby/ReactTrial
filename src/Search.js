import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,3)});
    console.log("You have changed a thing");
  }

  render() {
    return (
      <div>
      console.log(this.props.searchDataAPI)
      <input type="text"
          value={this.state.search}
          onChange = {this.updateSearch.bind(this)}/>
      </div>
    )
  }
}


export default Search
