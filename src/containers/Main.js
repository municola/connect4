import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { autobind } from 'core-decorators';
import { clickButton, undo } from '../actions/index.js';

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
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  getButtons() {
    return this.props.tale.cells.map((tales, index) => {
      return (
        <button
          onClick={() => this.props.clickButton(index)}
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

  @autobind
  connect() {
    const socket = io('http://localhost:4003');

    socket.emit('message', {});
    socket.on('answer', (message) => this.setState({ message }));
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
        <p>{this.state.message}</p>
        <button onClick={this.connect}>click</button>
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
  return bindActionCreators({ clickButton, undo }, dispatch);
}

App.propTypes = {
  tale: React.PropTypes.object.isRequired,
  undo: React.PropTypes.func.isRequired,
  clickButton: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
