import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LocalForm } from 'react-redux-form';
import styles from '../css/index.css';
import Main from './Main.js';
import Chat from './Chat.js';
import { connectMe, subscribe, setUsername } from '../actions/index.js';

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

  printGameButtons() {
    return this.props.game.buttons.map((item, index) => {
      return (
        <div style={style.row}>
          <button
            className={styles.roomButton}
            onClick={() => this.props.subscribe(index, this.props.game.username)}
          >
            {this.props.game.howMany[index]}/2
          </button>
        </div>
      );
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
              {this.printGameButtons()}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={style.body}>
        <LocalForm
          style={style.form}
          onSubmit={() => this.props.connectMe(this.props.game.username)}
        >
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
  return bindActionCreators({ connectMe, subscribe, setUsername }, dispatch);
}

Lobby.propTypes = {
  connectMe: React.PropTypes.func.isRequired,
  subscribe: React.PropTypes.func.isRequired,
  setUsername: React.PropTypes.func.isRequired,
  game: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Lobby);
