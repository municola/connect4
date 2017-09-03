import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { LocalForm } from 'react-redux-form';
import Main from './Main.js';
import { setUsername, joinTrue } from '../actions/index.js';

const style = {
  body: {
    fontSize: '2rem',
    fontFamily: 'sans-serif',
  },
};

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  @autobind
  join() {
    this.props.lobby.socket.emit('join', this.props.lobby.username);
    this.props.joinTrue();
  }

  render() {
    if (this.props.lobby.join === true) {
      return (
        <Main />
      );
    }
    return (
      <div style={style.body}>
        <LocalForm style={style.form} onSubmit={() => this.join()}>
          <p style={style.fontOne}>Username: </p>
          <input
            style={style.input}
            onChange={(event) => this.props.setUsername(event.target.value)}
          />
        </LocalForm>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lobby: state.lobby,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setUsername, joinTrue }, dispatch);
}

Lobby.propTypes = {
  lobby: React.PropTypes.object.isRequired,
  setUsername: React.PropTypes.func.isRequired,
  joinTrue: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Lobby);
