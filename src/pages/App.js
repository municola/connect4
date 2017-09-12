import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Helmet } from 'react-helmet';

import favicon from '../static/favicon.png';
import Lobby from '../containers/Lobby.js';
import { initSocket } from '../actions/index.js';

class App extends Component {
  @autobind
  componentDidMount() {
    this.props.initSocket(io('/socket.io'));
    // this.props.initSocket(io('http://localhost:4003'));
  }

  render() {
    return (
      <div>
        <Lobby />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Connect Four</title>
          <link rel="icon" href={favicon} />
        </Helmet>
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
