import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clickButton, undo, finishTurn, ready, myTurn, enemyTurn, symbol } from '../actions/index.js';

const style = {
  body: {
    fontSize: '2rem',
    fontFamily: 'sans-serif',
  },
  container: {
    paddingTop: '300px',
    width: '420px',
    margin: 'auto',
  },
  buttonField: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '420px',
  },
  button: {
    width: '60px',
    height: '60px',
  },
  undo: {
    margin: 'middle',
  },
};

class App extends Component {
  componentDidMount() {
    this.props.lobby.socket.emit('ready', (this.props.lobby.room));
    this.props.lobby.socket.on('start', () => {
      this.props.myTurn();
    });
    this.props.lobby.socket.on('symbol', (symbol) => this.props.symbol(symbol));
    this.props.lobby.socket.on('turn', (table) => this.props.enemyTurn(table));
  }

  getButtons() {
    return this.props.tale.cells.map((tales, index) => {
      return (
        <button
          onClick={() => this.handleButtonClick(index)}
          style={style.button}
          key={index}
        >{this.props.tale.cells[index]}</button>
      );
    });
  }

  handleButtonClick(index) {
    if (this.props.tale.myTurn === true) {
      this.props.clickButton(index, this.props.tale.mySymbol);
    } else {
      console.log('not your turn/client');
    }
  }

  undoButon() {
    if (this.props.tale.undoAvailable) {
      return (
        <button
          onClick={() => this.props.undo(this.props.tale.count)}
          style={style.undo}
        >Undo</button>
      );
    }
    return false;
  }

  finishTurnButton() {
    if (this.props.tale.undoAvailable) {
      return (
        <button
          onClick={() => this.props.finishTurn(this.props.lobby.socket, this.props.lobby.room, this.props.tale.cells)}
        >finish turn</button>
      );
    }
    return false;
  }

  render() {
    return (
      <div style={style.body}>
        <div style={style.container}>
          {this.props.tale.announcement}
          <div style={style.buttonField}>
            {this.getButtons()}
          </div>
        </div>
        {this.undoButon()}
        {this.finishTurnButton()}
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
  return bindActionCreators({ clickButton, undo, finishTurn, ready, myTurn, enemyTurn, symbol }, dispatch);
}

App.propTypes = {
  tale: React.PropTypes.object.isRequired,
  lobby: React.PropTypes.object.isRequired,
  undo: React.PropTypes.func.isRequired,
  clickButton: React.PropTypes.func.isRequired,
  finishTurn: React.PropTypes.func.isRequired,
  ready: React.PropTypes.func.isRequired,
  myTurn: React.PropTypes.func.isRequired,
  enemyTurn: React.PropTypes.func.isRequired,
  symbol: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
