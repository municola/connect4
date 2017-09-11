import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Lobby from '../containers/Lobby.js';
import { initSocket } from '../actions/index.js';

class App extends Component {
  @autobind
  componentDidMount() {
    this.props.initSocket(io('https://dolansoft.org:3000'));
    // this.props.initSocket(io('http://localhost:4003'));
  }

  render() {
    return (
      <div>
        <Lobby />
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ initSocket }, dispatch);
}

App.propTypes = {
  initSocket: React.PropTypes.func,
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
