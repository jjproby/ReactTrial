import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };

    this.updateSearch = this.updateSearch.bind(this);
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
        <form onSubmit={this.handleSubmit}>
          <input type="text"
              value={this.state.search}
              onChange={this.updateSearch}/>
        </form>
      </div>
    )
  }
}


export default Search
