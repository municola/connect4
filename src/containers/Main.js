import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { autobind } from 'core-decorators';
import { clickButton, undo, ready } from '../actions/index.js';

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
  getButtons() {
    return this.props.tale.cells.map((tales, index) => {
      return (
        <button
          onClick={() => this.props.clickButton(index, this.props.tale.turn)}
          style={style.button}
          key={index}
        >{this.props.tale.cells[index]}</button>
      );
    });
  }

  currentTurn() {
    if (this.props.tale.count === 1) {
      return <p>Turn: O</p>;
    } return <p>Turn: X</p>;
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

  render() {
    return (
      <div style={style.body}>
        {this.currentTurn()}
        <div style={style.container}>
          <div style={style.buttonField}>
            {this.getButtons()}
          </div>
        </div>
        {this.undoButon()}
        <button
          onClick={this.props.ready(this.props.tale.count, this.props.tale.myTurn)}
        >
          finish turn
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tale: state.tales,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ clickButton, undo, ready }, dispatch);
}

App.propTypes = {
  tale: React.PropTypes.object.isRequired,
  undo: React.PropTypes.func.isRequired,
  clickButton: React.PropTypes.func.isRequired,
  ready: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
