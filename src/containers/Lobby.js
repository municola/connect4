import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { LocalForm } from 'react-redux-form';
import Main from './Main.js';
import { setUsername, update, confirmed, connected } from '../actions/index.js';

const style = {
  body: {
    display: 'flex',
    fontSize: '2rem',
    fontFamily: 'sans-serif',
    backgroundColor: '#076689',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    width: '400px',
    padding: '10px',
    fontSize: '30px',
    color: '#076689 ',
    backgroundColor: '#FBC75A',
    border: '1px solid grey',
  },
  lobby: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '800px',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  roomButton: {
    color: '#076689 ',
    backgroundColor: '#FBC75A',
    border: '1px solid grey',
    fontSize: '25px',
    padding: '15px',
  },
  howMany: {
    color: '#FBC75A',
    marginBottom: '0px',
  },
  announcerRow: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  announcer: {
    margin: '0px',
    color: '#FBC75A',
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
        <div style={style.body}>
          <div style={style.lobby}>
            <div style={style.announcerRow}>
              <p style={style.announcer}>Games: </p>
              <p style={style.announcer}>Players: </p>
            </div>
            <div style={style.row}>
              <button style={style.roomButton} onClick={() => this.subscribe(0)}>Game 1</button>
              <p style={style.howMany}>{this.props.tale.howMany[0]}</p>
            </div>
            <div style={style.row}>
              <button style={style.roomButton} onClick={() => this.subscribe(1)}>Game 2</button>
              <p style={style.howMany}>{this.props.tale.howMany[1]}</p>
            </div>
            <div style={style.row}>
              <button style={style.roomButton} onClick={() => this.subscribe(2)}>Game 3</button>
              <p style={style.howMany}>{this.props.tale.howMany[2]}</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={style.body}>
        <LocalForm style={style.form} onSubmit={() => this.connect()}>
          <input
            autoFocus
            style={style.input}
            placeholder="Username"
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
  connected: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Lobby);
