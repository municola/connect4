import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../css/ConnectFour.css';
import wcn from '../static/winCombo.js';
import {
  clickButton,
  enemyTurn,
  finishTurn,
  firstTurn,
  ready,
  symbol,
  setWinner,
  undo,
  unsubscribed,
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
    width: '245px',
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
    this.props.socket.socket.on('ready', (sym, message) => this.props.symbol(sym, message));
    this.props.socket.socket.on('firstTurn', () => {
      this.props.firstTurn();
    });
    this.props.socket.socket.on('turn', (table) => this.props.enemyTurn(table));
    this.props.socket.socket.on('winner', () => {
      this.props.setWinner('You Lost');
    });
  }

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
        this.props.socket.socket.emit('winner');
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
            this.props.finishTurn(this.props.socket.socket, this.props.game.cells);
          }}
        >Finish Turn</button>
      );
    }
    return <button className={styles.buttonType2}>Finish Turn</button>;
  }

  leave() {
    this.props.socket.socket.emit('unsubscribe', this.props.game.roomId);
    this.props.socket.socket.on('unsubscribed', () => this.props.unsubscribed());
  }

  render() {
    if (!this.props.game.winner) {
      return (
        <div style={style.body}>
          <div style={style.container}>
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
      );
    } return (
      <div style={style.body}>
        <div style={style.container2}>
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
    clickButton,
    enemyTurn,
    finishTurn,
    firstTurn,
    ready,
    symbol,
    setWinner,
    undo,
    unsubscribed,
  }, dispatch);
}

App.propTypes = {
  clickButton: React.PropTypes.func.isRequired,
  enemyTurn: React.PropTypes.func.isRequired,
  firstTurn: React.PropTypes.func.isRequired,
  finishTurn: React.PropTypes.func.isRequired,
  game: React.PropTypes.object.isRequired,
  setWinner: React.PropTypes.func.isRequired,
  socket: React.PropTypes.object.isRequired,
  symbol: React.PropTypes.func.isRequired,
  undo: React.PropTypes.func.isRequired,
  unsubscribed: React.PropTypes.func.isRequired,

};

export default connect(mapStateToProps, matchDispatchToProps)(App);
