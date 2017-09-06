import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import io from 'socket.io-client';

import Lobby from '../containers/Lobby.js';
import { initSocket } from '../actions/index.js';


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

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ initSocket }, dispatch);
}

App.propTypes = {
  initSocket: React.PropTypes.func,
};

export default connect(matchDispatchToProps)(App);
