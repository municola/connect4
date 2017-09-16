import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../css/index.css';
import wcn from '../static/winCombo.js';
import GameChat from './GameChat.js';
import {
  clickButton,
  undo,
  leave,
  setWinner,
  finishTurn,
} from '../actions/index.js';

import { unsubscribe } from '../actions/socketio.js';

const style = {
  body: {
    display: 'flex',
    fontSize: '2rem',
    fontFamily: 'sans-serif',
    backgroundColor: '#1D2C54',
    minHeight: '100vh',
    justifyContent: 'center',
  },
  chatContainer: {
    display: 'flex',
    width: '30%',
    padding: '100px',
    paddingRight: '0px',
  },
  gameContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  buttonField: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '490px',
  },
  sym: {
    margin: '0px',
    fontSize: '30px',
    color: '#076689',
  },
  fontOne: {
    fontSize: '30px',
    color: '#9FACCA',
  },
  buttonArea: {
    display: 'flex',
    marginTop: '30px',
  },
  areaOne: {
    width: '245px',
  },
  areTwo: {
    width: '245px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  leaveArea: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

class App extends Component {
  getButtons() {
    return this.props.game.cells.map((tale, index) => {
      return (
        <button
          onClick={() => this.handleButtonClick(index)}
          className={styles.button}
          key={index}
        ><p style={style.sym}>{this.props.game.cells[index]}</p></button>
      );
    });
  }

  checkForWinner() {
    for (let i = 0; i < wcn.length; i++) {
      if (this.props.game.cells[wcn[i][0]] === this.props.game.cells[wcn[i][1]] &&
        this.props.game.cells[wcn[i][2]] === this.props.game.cells[wcn[i][3]] &&
        this.props.game.cells[wcn[i][1]] === this.props.game.cells[wcn[i][2]] &&
        (this.props.game.cells[wcn[i][0]] === 'X' || this.props.game.cells[wcn[i][0]] === 'O')
      ) {
        this.props.setWinner('You Won');
      }
    }
  }

  handleButtonClick(index) {
    if (!this.props.game.winner) {
      if (this.props.game.myTurn) {
        this.props.clickButton(index, this.props.game.mySymbol);
      } else {
        console.log('not your turn/client');
      }
    }
  }

  undoButon() {
    if (this.props.game.undoAvailable) {
      return (
        <button
          onClick={() => this.props.undo(this.props.game.count)}
          className={styles.buttonType2}
        >Undo</button>
      );
    }
    return <button className={styles.buttonType2}>Undo</button>;
  }

  finishTurnButton() {
    if (this.props.game.undoAvailable) {
      return (
        <button
          className={styles.buttonType2}
          onClick={() => {
            this.checkForWinner();
            this.props.finishTurn(this.props.game.cells);
          }}
        >Finish Turn</button>
      );
    }
    return <button className={styles.buttonType2}>Finish Turn</button>;
  }

  leave() {
    unsubscribe(this.props.game.roomId, this.props.game.username);
    this.props.leave();
  }

  render() {
    if (!this.props.game.winner) {
      return (
        <div style={style.body}>
          <div style={style.chatContainer}>
            <GameChat />
          </div>
          <div style={style.gameContainer}>
            <div style={style.innerGameContainer}>
              <p style={style.fontOne}>{this.props.game.message}</p>
              <div style={style.buttonField}>
                {this.getButtons()}
              </div>
              <div style={style.buttonArea}>
                <div style={style.areaOne}>
                  {this.undoButon()}
                  {this.finishTurnButton()}
                </div>
                <div style={style.areTwo}>
                  <button
                    className={styles.buttonType2}
                    onClick={() => this.leave()}
                  >Leave Game</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } return (
      <div style={style.body}>
        <div style={style.chatContainer}>
          <GameChat />
        </div>
        <div style={style.gameContainer}>
          <div style={style.innerGameContainer}>
            <p style={style.fontOne}>{this.props.game.winnerMessage}</p>
            <div style={style.buttonField}>
              {this.getButtons()}
            </div>
            <div style={style.leaveArea}>
              <button
                className={styles.buttonType2}
                onClick={() => this.leave()}
              >Leave Game</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    game: state.game,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setWinner,
    clickButton,
    undo,
    finishTurn,
    leave,
  }, dispatch);
}

App.propTypes = {
  clickButton: React.PropTypes.func.isRequired,
  finishTurn: React.PropTypes.func.isRequired,
  game: React.PropTypes.object.isRequired,
  setWinner: React.PropTypes.func.isRequired,
  undo: React.PropTypes.func.isRequired,
  leave: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
