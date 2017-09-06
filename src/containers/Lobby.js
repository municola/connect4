import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { LocalForm } from 'react-redux-form';
import Main from './Main.js';
import { setUsername, update, confirmed, connected } from '../actions/index.js';

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
  connect() {
    console.log('connect loop');
    console.log(this.props.lobby.socket);
    this.props.lobby.socket.emit('connectMe');
    this.props.lobby.socket.on('update', (howMany) => {
      this.props.update(howMany);
    });
    this.props.lobby.socket.on('connected', () => this.props.connected());
  }

  @autobind
  subscribe(roomId) {
    this.props.lobby.socket.emit('subscribe', roomId);
    this.props.lobby.socket.on('update', (howMany) => {
      this.props.update(howMany);
    });
    this.props.lobby.socket.on('confirmed', () => {
      this.props.confirmed(roomId);
    });
  }

  render() {
    if (this.props.tale.connected === true) {
      if (this.props.tale.subscribed === true) {
        return <Main />;
      }
      return (
        <div style={style.chatRooms}>
          <button style={style.roomButton} onClick={() => this.subscribe(0)}>Room 1</button>
          <p>{this.props.tale.howMany[0]}</p>
          <button style={style.roomButton} onClick={() => this.subscribe(1)}>Room 2</button>
          <p>{this.props.tale.howMany[1]}</p>
          <button style={style.roomButton} onClick={() => this.subscribe(2)}>Room 3</button>
          <p>{this.props.tale.howMany[2]}</p>
        </div>
      );
    }
    return (
      <div style={style.body}>
        <LocalForm style={style.form} onSubmit={() => this.connect()}>
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
    tale: state.tales,
    lobby: state.lobby,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setUsername, update, confirmed, connected }, dispatch);
}

Lobby.propTypes = {
  tale: React.PropTypes.object.isRequired,
  lobby: React.PropTypes.object.isRequired,
  setUsername: React.PropTypes.func.isRequired,
  update: React.PropTypes.func.isRequired,
  confirmed: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Lobby);
