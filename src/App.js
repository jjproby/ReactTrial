import React, { Component } from 'react';
import Search from './Search';

class App extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      data: [],
      error: '',
    };

    this.search = this.search.bind(this);
  }

  search({query}) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}/`)
        .then(res => res.json())
        .then(res => {
            return res;
        }).then(json => {
          this.setState({
              query: query,
              data: json,
              error: json.Error
          }, () => {
            console.log(query);
            console.log(json);
          });
        }).catch(err => this.setState({
            error: 'Error Occurred: Try Again',
            data: [],
        }));
  }

  render () {
    return (
      <div>
        <h1> Input a number 1 - 802 </h1>
        <Search search={this.search} />
        <p>{this.state.data.name}</p>
        {
          this.state.error
          ? <p>{this.state.error}</p>
          : null
        }

      </div>
    )
  }
}

export default App
