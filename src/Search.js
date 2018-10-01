import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  render() {
    return (
      <div>
      <input type="text"
          value={this.state.search} />
      </div>
    )
  }
}


export default Search
