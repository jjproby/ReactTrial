import React, { Component } from "react";
import Search from './Search';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: #5995ea;
  outline: 5px solid black;
`;

const Title = styled.h1`
  text-align: center;
`;

class Moves extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      data: [],
      error: '',
    };

    this.search = this.search.bind(this);
    this.toggleForward = this.toggleForward.bind(this);
    this.toggleBackward = this.toggleBackward.bind(this);
  }

  search({query}) {
    fetch(`https://pokeapi.co/api/v2/move/${query}/`)
        .then(res => res.json())
        .then(res => {
            return res;
        }).then(json => {
          this.setState({
              query: query,
              data: json,
              error: json.Error,
          }, () => {
            //console.log(query);
            //console.log(json);
          });
        }).catch(err => this.setState({
            error: 'Error Occurred: Try Again',
            data: [],
        }));
      }

  toggleForward() {
    let searchQuery = Number(this.state.query);
    let newQuery = null;
    if (searchQuery === 1000) {
      newQuery = 1;
    } else {
      newQuery = Number(this.state.query) + 1;
    }
    this.setState({query: newQuery})
    this.search({query: newQuery})
  }

  toggleBackward() {
    let searchQuery = Number(this.state.query);
    let newQuery = null;
    if (searchQuery === 1) {
      newQuery = 1000;
    } else {
      newQuery = searchQuery - 1;
    }
    this.setState({query: newQuery});
    this.search({query: newQuery})
  }

  render() {
    console.log(this.state.data)

    const moveFlavor = this.state.data.flavor_text_entries

    let flavor = null;
    let fowardButton = null;
    let backButton = null;

    if (moveFlavor !== undefined) {
      this.state.data.flavor_text_entries.map((entry, i) => {
        if (entry.language.name === "en") {
          flavor = entry.flavor_text
        }
      })
      fowardButton = <button type="button" onClick={this.toggleForward}> Next Move </button>
      backButton = <button type="button" onClick={this.toggleBackward}> Previous Move </button>
    }

    return (
      <Wrapper>
        <div class="result">
          <Title> SEARCH FOR MOVES </Title>
          <Search search = {this.search} />
          <p> {backButton} {fowardButton} </p>
          <p> Name : {this.state.data.name} </p>
          <p> Accuracy : {this.state.data.accuracy} </p>
          <p> Effect Chance : {this.state.data.effect_chance} </p>
          <p> Power : {this.state.data.power} </p>
          <p> {flavor} </p>
          {
            this.state.error
            ? <p>{this.state.error}</p>
            : null
          }
        </div>
      </Wrapper>
    );
  }
}

export default Moves
