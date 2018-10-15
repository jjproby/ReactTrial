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

class Abilities extends Component {
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
    fetch(`https://pokeapi.co/api/v2/ability/${query}/`)
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
    if (searchQuery === 232) {
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
      newQuery = 232;
    } else {
      newQuery = searchQuery - 1;
    }
    this.setState({query: newQuery});
    this.search({query: newQuery})
  }

  render() {
    console.log(this.state.data)

    const abilityEffects = this.state.data.effect_entries

    let effects = null;
    let pokemon = [];
    let generation = null;
    let fowardButton = null;
    let backButton = null;

    if (abilityEffects !== undefined) {
      generation = this.state.data.generation.name
      effects = this.state.data.effect_entries[0].effect
      fowardButton = <button type="button" onClick={this.toggleForward}> Next Ability </button>
      backButton = <button type="button" onClick={this.toggleBackward}> Previous Ability </button>
      pokemon = this.state.data.pokemon.map((name, i) => {
        return (
          <li key={i}> {name.pokemon.name} </li>
        )
      })
    }

    return (
      <Wrapper>
        <div class="result">
          <Title> SEARCH FOR ABILITY</Title>
          <h2> Input number 1 - 232 </h2>
          <Search search = {this.search}/>
          <p> {backButton} {fowardButton} </p>
          <p> Name : {this.state.data.name} </p>
          <p> Effect: {effects} </p>
          <p> Generation: {generation} </p>
          <p> Pokemon with this ability: </p>
          <ul>
            {pokemon}
          </ul>
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

export default Abilities;
