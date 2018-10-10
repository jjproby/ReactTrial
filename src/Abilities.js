import React, { Component } from "react";
import Search from './Search';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 4em;
  background: #5995ea;
  outline: 5px solid black;
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

  render() {
    console.log(this.state.data)

    const abilityEffects = this.state.data.effect_entries

    let effects = null;
    let pokemon = [];
    let generation = null;

    if (abilityEffects !== undefined) {
      generation = this.state.data.generation.name
      effects = this.state.data.effect_entries[0].effect
      pokemon = this.state.data.pokemon.map((name, i) => {
        return (
          <li key={i}> {name.pokemon.name} </li>
        )
      })
    }

    return (
      <Wrapper>
        <h2> Search for ability </h2>
        <Search search = {this.search}/>
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
      </Wrapper>
    );
  }
}

export default Abilities;
