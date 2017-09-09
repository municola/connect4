import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { LocalForm } from 'react-redux-form';
import styles from '../css/index.css';
import Main from './Main.js';
import Chat from './Chat.js';
import {
  confirmed,
  connected,
  setUsername,
  updateHowMany,
  updateMembers,
} from '../actions/index.js';

const style = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '2rem',
    fontFamily: 'sans-serif',
    backgroundColor: '#1D2C54',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyLobby: {
    display: 'flex',
    fontSize: '2rem',
    fontFamily: 'sans-serif',
    backgroundColor: '#1D2C54',
    minHeight: '100vh',
    justifyContent: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10vh',
    width: '800px',
  },
  welcomeBlock: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: '7vh',
  },
  fontOne: {
    margin: '0px',
    color: 'white',
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
    color: '#57699A ',
    backgroundColor: 'white',
    border: '1px solid #57699A',
  },
  lobby: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '800px',
    marginTop: '5vh',
    height: '7vh',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  announcerRow: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  announcer: {
    margin: '0px',
    color: 'white',
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
    this.props.socket.socket.emit('connectMe', this.props.game.username);
    this.props.socket.socket.on('update', (howMany) => {
      this.props.updateHowMany(howMany);
    });
    this.props.socket.socket.on('updateMembers', (members) => {
      this.props.updateMembers(members);
    });
    this.props.socket.socket.on('connected', () => this.props.connected());
  }

  @autobind
  subscribe(roomId) {
    this.props.socket.socket.emit('subscribe', roomId);
    this.props.socket.socket.on('update', (howMany) => {
      this.props.updateHowMany(howMany);
    });
    this.props.socket.socket.on('confirmed', () => {
      this.props.confirmed(roomId);
    });
  }

  render() {
    if (this.props.game.connected) {
      if (this.props.game.subscribed) {
        return <Main />;
      }
      return (
        <div style={style.bodyLobby}>
          <div style={style.innerContainer}>
            <div style={style.welcomeBlock}>
              <p style={style.fontOne}>Hi {this.props.game.username}</p>
            </div>
            <Chat />
            <div style={style.lobby}>
              <div style={style.announcerRow}>
                <p style={style.announcer}>Games: </p>
              </div>
              <div style={style.row}>
                <button className={styles.roomButton} onClick={() => this.subscribe(0)}>
                  {this.props.game.howMany[0]}/2</button>
              </div>
              <div style={style.row}>
                <button className={styles.roomButton} onClick={() => this.subscribe(1)}>
                  {this.props.game.howMany[1]}/2</button>
              </div>
              <div style={style.row}>
                <button className={styles.roomButton} onClick={() => this.subscribe(2)}>
                  {this.props.game.howMany[2]}/2</button>
              </div>
              <div style={style.row}>
                <button className={styles.roomButton} onClick={() => this.subscribe(3)}>
                  {this.props.game.howMany[3]}/2</button>
              </div>
              <div style={style.row}>
                <button className={styles.roomButton} onClick={() => this.subscribe(4)}>
                  {this.props.game.howMany[4]}/2</button>
              </div>
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
    game: state.game,
    socket: state.socket,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    confirmed,
    connected,
    setUsername,
    updateHowMany,
    updateMembers,
  }, dispatch);
}

Lobby.propTypes = {
  confirmed: React.PropTypes.func.isRequired,
  connected: React.PropTypes.func.isRequired,
  game: React.PropTypes.object.isRequired,
  setUsername: React.PropTypes.func.isRequired,
  socket: React.PropTypes.object.isRequired,
  updateHowMany: React.PropTypes.func.isRequired,
  updateMembers: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Lobby);
