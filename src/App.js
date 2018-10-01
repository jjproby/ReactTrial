import React, { Component } from 'react';
import Search from './Search';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      error: '',
    };
  }

  componentWillMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon/800/`)
        .then(res => res.json())
        .then(res => {
            return res;
        }).then(json => {
          this.setState({
              data: json,
              error: json.Error
          });
        }).catch(err => this.setState({
            error: 'Error Occurred: Try Again',
            data: [],
        }));
  }

  render () {
    var searchData = 'https://pokeapi.co/api/v2/pokemon/'
    return (
      <div>
        <h1> Input a number 1-800 </h1>
        < Search searchDataAPI = {searchData}/>
        <p>{this.state.data.name}</p>
      </div>
    )
  }
}

export default App
