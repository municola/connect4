import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { setX, setO, cickSymbol, cickSymbol2, getState, undoCickedSymbol } from '../actions/index.js';

const style = {
  body: {
    margin: '-8px',
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
};

class App extends Component {
  getButtons() {
    return this.props.tale.cells.map((tales, index) => {
      return (
        <button
          onClick={() => this.handleOnClick(index)}
          style={style.button}
          key={index}
        >{this.props.tale.cells[index]}</button>
      );
    });
  }

  setSymbol(index) {
    if (this.props.tale.count === 0) {
      this.props.setX(index);
    } else {
      this.props.setO(index);
    }
  }

  handleOnClick(index) {
    if (this.props.tale.cells[index] === 'X' || this.props.tale.cells[index] === 'O') {
      this.checkForState2(index);
      // this.props.getState();
    }
    else if (this.props.tale.cells[index] === ' ') {
      if (index > 34) {
        this.checkForState(index);
      }
      if (this.props.tale.cells[index + 7] !== ' ') {
        this.checkForState(index);
      }
    }
  }

  checkForState(index) {
    this.setSymbol(index);
  }

  checkForState2(index) {
    let id = index;
    while (this.props.tale.cells[id] === 'X' || this.props.tale.cells[id] === 'O') {
      if (id > 6) {
        this.props.cickSymbol(id);
      } else {
        this.props.cickSymbol2(id);
      }
      id -= 7;
    }
    for (let l = 0; l < this.props.talePast.length; l++) {
      if (this.props.tale.cells === this.props.talePast[l]) {
        // this.props.tale.cells = this.props.talePast[l].cells;
        // (geht nicht, da store read-only)
        // => {this.props.onUndo} ??
        // Wird messy
      }
    }
  }

  render() {
    return (
      <div style={style.body}>
        <div style={style.container}>
          <div style={style.buttonField}>
            {this.getButtons()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tale: state.tales.present,
    talePast: state.tales.past,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setX,
    setO,
    cickSymbol,
    cickSymbol2,
    getState,
    undoCickedSymbol,
    onUndo: UndoActionCreators.undo,
  }, dispatch);
}

App.propTypes = {
  tale: React.PropTypes.object.isRequired,
  talePast: React.PropTypes.array.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
