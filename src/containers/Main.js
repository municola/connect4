import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../css/ConnectFour.css';
import {
  clickButton,
  undo, finishTurn,
  ready, firstTurn,
  enemyTurn,
  symbol,
  unsubscribed,
  setWinner,
} from '../actions/index.js';

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
  container: {
    width: '490px',
    margin: 'auto',
  },
  container2: {

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
    color: '#FBC75A',
  },
  buttonArea: {
    display: 'flex',
    marginTop: '30px',
  },
  areaOne: {
    width: '245px',
  },
  areTwo: {
    width: '245',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    color: '#076689 ',
    backgroundColor: '#FBC75A',
    border: '1px solid grey',
    fontSize: '20px',
    padding: '10px',
  },
  leaveArea: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

class App extends Component {
  componentDidMount() {
    this.props.lobby.socket.on('ready', (sym, message) => this.props.symbol(sym, message));
    this.props.lobby.socket.on('firstTurn', () => {
      this.props.firstTurn();
    });
    this.props.lobby.socket.on('turn', (table) => this.props.enemyTurn(table));
    this.props.lobby.socket.on('winner', () => {
      this.props.setWinner('You Lost');
    });
  }

  getButtons() {
    return this.props.tale.cells.map((tales, index) => {
      return (
        <button
          onClick={() => this.handleButtonClick(index)}
          className={styles.button}
          key={index}
        ><p style={style.sym}>{this.props.tale.cells[index]}</p></button>
      );
    });
  }

  checkForWinner() {
    const wcn =
      [
      // horizontal
        [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
        [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
        [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
        [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
        [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
        [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
      // vertical
        [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
        [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
        [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
        [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
        [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
        [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
        [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
      // diagonal to right
        [21, 15, 9, 3], [28, 22, 16, 10], [22, 16, 10, 4], [35, 29, 23, 17],
        [29, 23, 17, 11], [23, 17, 11, 5], [36, 30, 24, 18], [30, 24, 18, 12],
        [24, 18, 12, 6], [37, 31, 25, 19], [31, 25, 19, 13], [38, 32, 26, 20],
      // diagonal to left
        [38, 30, 22, 14], [39, 31, 23, 15], [31, 23, 15, 7], [40, 32, 24, 16],
        [32, 24, 16, 8], [24, 16, 8, 0], [41, 33, 25, 17], [33, 25, 17, 9],
        [25, 17, 9, 1], [34, 26, 18, 10], [26, 18, 10, 2], [27, 19, 11, 3],
      ];
    for (let i = 0; i < wcn.length; i++) {
      if (this.props.tale.cells[wcn[i][0]] === this.props.tale.cells[wcn[i][1]] &&
        this.props.tale.cells[wcn[i][2]] === this.props.tale.cells[wcn[i][3]] &&
        this.props.tale.cells[wcn[i][1]] === this.props.tale.cells[wcn[i][2]] &&
        (this.props.tale.cells[wcn[i][0]] === 'X' || this.props.tale.cells[wcn[i][0]] === 'O')
      ) {
        this.props.setWinner('You Won');
        this.props.lobby.socket.emit('winner');
      }
    }
  }

  handleButtonClick(index) {
    if (!this.props.tale.winner) {
      if (this.props.tale.myTurn) {
        this.props.clickButton(index, this.props.tale.mySymbol);
      } else {
        console.log('not your turn/client');
      }
    }
  }

  undoButon() {
    if (this.props.tale.undoAvailable) {
      return (
        <button
          onClick={() => this.props.undo(this.props.tale.count)}
          className={styles.buttonType2}
        >Undo</button>
      );
    }
    return <button className={styles.buttonType2}>Undo</button>;
  }

  finishTurnButton() {
    if (this.props.tale.undoAvailable) {
      return (
        <button
          className={styles.buttonType2}
          onClick={() => {
            this.checkForWinner();
            this.props.finishTurn(this.props.lobby.socket, this.props.tale.cells);
          }}
        >Finish Turn</button>
      );
    }
    return <button className={styles.buttonType2}>Finish Turn</button>;
  }

  leave() {
    this.props.lobby.socket.emit('unsubscribe', this.props.tale.roomId);
    this.props.lobby.socket.on('unsubscribed', () => this.props.unsubscribed());
  }

  render() {
    if (!this.props.tale.winner) {
      return (
        <div style={style.body}>
          <div style={style.container}>
            <p style={style.fontOne}>{this.props.tale.message}</p>
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
      );
    } return (
      <div style={style.body}>
        <div style={style.container2}>
          <p style={style.fontOne}>{this.props.tale.winnerMessage}</p>
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
  return bindActionCreators({
    clickButton,
    undo,
    finishTurn,
    ready,
    firstTurn,
    enemyTurn,
    symbol,
    unsubscribed,
    setWinner,
  }, dispatch);
}

App.propTypes = {
  tale: React.PropTypes.object.isRequired,
  lobby: React.PropTypes.object.isRequired,
  undo: React.PropTypes.func.isRequired,
  clickButton: React.PropTypes.func.isRequired,
  finishTurn: React.PropTypes.func.isRequired,
  enemyTurn: React.PropTypes.func.isRequired,
  symbol: React.PropTypes.func.isRequired,
  unsubscribed: React.PropTypes.func.isRequired,
  setWinner: React.PropTypes.func.isRequired,
  firstTurn: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
