import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { LocalForm } from 'react-redux-form';
import Main from './Main.js';
import { setUsername, joinTrue, room, peopleUpdate } from '../actions/index.js';

const style = {
  body: {
    fontSize: '2rem',
    fontFamily: 'sans-serif',
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
  join() {
    this.props.joinTrue();
    this.props.lobby.socket.emit('update');
    this.props.lobby.socket.on('update', (people) => {
      this.props.peopleUpdate(people);
    });
  }

  @autobind
  connect(i) {
    this.props.lobby.socket.emit('subscribe', i);
    this.props.room(i);
  }

  render() {
    if (this.props.lobby.join === true) {
      if (this.props.lobby.subscribed === true) {
        return <Main />;
      }
      return (
        <div style={style.chatRooms}>
          <button style={style.roomButton} onClick={() => this.connect(0)}>Room 1</button>
          <p>{this.props.lobby.people[0]}</p>
          <button style={style.roomButton} onClick={() => this.connect(1)}>Room 2</button>
          <p>{this.props.lobby.people[1]}</p>
          <button style={style.roomButton} onClick={() => this.connect(2)}>Room 3</button>
          <p>{this.props.lobby.people[2]}</p>
        </div>
      );
    }
    return (
      <div style={style.body}>
        <LocalForm style={style.form} onSubmit={() => this.join()}>
          <p style={style.fontOne}>Username: </p>
          <input
            style={style.input}
            onChange={(event) => this.props.setUsername(event.target.value)}
          />
        </LocalForm>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lobby: state.lobby,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setUsername, joinTrue, room, peopleUpdate }, dispatch);
}

Lobby.propTypes = {
  lobby: React.PropTypes.object.isRequired,
  setUsername: React.PropTypes.func.isRequired,
  joinTrue: React.PropTypes.func.isRequired,
  room: React.PropTypes.func.isRequired,
  peopleUpdate: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Lobby);
