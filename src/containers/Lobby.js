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
  enemyTurn,
  firstTurn,
  gameStartMessage,
  newGameMessage,
  newMessage,
  newUser,
  playerJoined,
  playerLeft,
  setEnemyName,
  setUsername,
  setWinner,
  symbol,
  updateHowMany,
  updateMembers,
  userLeft,
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
    this.props.socket.socket.on('newMessage', (id, username, message) => {
      this.props.newMessage(id, username, message);
    });
    this.props.socket.socket.on('newUser', (id, username) => {
      this.props.newUser(id, username);
    });
    this.props.socket.socket.on('userLeft', (id, username) => {
      this.props.userLeft(id, username);
    });
    this.props.socket.socket.on('ready', (sym, message) => {
      this.props.gameStartMessage();
      this.props.symbol(sym, message);
    });
    this.props.socket.socket.on('firstTurn', () => {
      this.props.firstTurn();
    });
    this.props.socket.socket.on('turn', (table) => this.props.enemyTurn(table));
    this.props.socket.socket.on('winner', () => {
      this.props.setWinner('You Lost');
    });
    this.props.socket.socket.on('enemyName', (enemyName) => {
      this.props.socket.socket.emit('enemyName', this.props.game.roomId, this.props.game.username);
      this.props.setEnemyName(enemyName);
    });
    this.props.socket.socket.on('playerLeft', (id, username) => {
      this.props.playerLeft(id, username);
      this.props.setWinner('You won (Forfeit)');
    });
    this.props.socket.socket.on('playerJoined', (id, username) => {
      this.props.playerJoined(id, username);
    });
    this.props.socket.socket.on('newGameMessage', (id, username, message) => {
      this.props.newGameMessage(id, username, message);
    });
  }

  @autobind
  subscribe(roomId) {
    this.props.socket.socket.emit('subscribe', roomId, this.props.game.username);
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
    enemyTurn,
    firstTurn,
    gameStartMessage,
    newGameMessage,
    newMessage,
    newUser,
    playerJoined,
    playerLeft,
    setEnemyName,
    setUsername,
    setWinner,
    symbol,
    updateHowMany,
    updateMembers,
    userLeft,
  }, dispatch);
}

Lobby.propTypes = {
  confirmed: React.PropTypes.func.isRequired,
  connected: React.PropTypes.func.isRequired,
  enemyTurn: React.PropTypes.func.isRequired,
  firstTurn: React.PropTypes.func.isRequired,
  game: React.PropTypes.object.isRequired,
  gameStartMessage: React.PropTypes.func.isRequired,
  newGameMessage: React.PropTypes.func.isRequired,
  newMessage: React.PropTypes.func.isRequired,
  newUser: React.PropTypes.func.isRequired,
  playerJoined: React.PropTypes.func.isRequired,
  playerLeft: React.PropTypes.func.isRequired,
  setEnemyName: React.PropTypes.func.isRequired,
  setUsername: React.PropTypes.func.isRequired,
  setWinner: React.PropTypes.func.isRequired,
  socket: React.PropTypes.object.isRequired,
  symbol: React.PropTypes.func.isRequired,
  updateHowMany: React.PropTypes.func.isRequired,
  updateMembers: React.PropTypes.func.isRequired,
  userLeft: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Lobby);
