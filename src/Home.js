import React, {Component} from "react";
import styled from 'styled-components';
import Leon from './ProfLeon.png';
import ball from './Pokeball.png';

const Wrapper = styled.section`
  padding: 4em;
  background: #5995ea;
  outline: 5px solid black;
`;

class Home extends Component {
  render () {
    return(
      <Wrapper>
        <div>
          <h2> Welcome </h2>
          <img src={ball} class="ball" height="200" width="200" />
          <p> This is a project </p>
          <img src={Leon} />
        </div>
      </Wrapper>
    )
  }
}

export default Home
