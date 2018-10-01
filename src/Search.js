import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.state);
    this.setState({ search: "" });
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
