import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import io from 'socket.io-client';

import Lobby from '../containers/Lobby.js';
import { initSocket, myTurn, enemyTurn } from '../actions/index.js';


class App extends Component {
  @autobind
  componentDidMount() {
    this.props.initSocket(io('http://localhost:4003'));
  }

  render() {
    return (
      <div>
        <Lobby />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lobby: state.lobby,
    tales: state.tales,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ initSocket, myTurn, enemyTurn }, dispatch);
}

App.propTypes = {
  lobby: React.PropTypes.object.isRequired,
  initSocket: React.PropTypes.func,
  myTurn: React.PropTypes.func,
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
