import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { LocalForm } from 'react-redux-form';
import { newMessage, newUser, newGameMessage } from '../actions/index.js';

const style = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '2rem',
    fontFamily: 'sans-serif',
    backgroundColor: '#076689',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class GameChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  componentDidMount() {
    this.props.socket.socket.on('newGameMessage', (id, username, message) => {
      this.props.newGameMessage(id, username, message);
    });
  }

  getChatlog() {
    return this.props.chat.gamechatlog.map((item) => {
      switch (item[0]) {
        case 0 : {
          return <p style={style.you}>{item[2]}</p>;
        }
        case 1 : {
          return <p style={style.otherUser}>{item[1]} : {item[2]}</p>;
        }
        default : {
          return false;
        }
      }
    });
  }

  @autobind
  change(event) {
    if (event.target.value !== '') {
      this.setState({ input: event.target.value });
    }
  }

  @autobind
  send() {
    this.props.socket.socket.emit(
      'gameMessage', this.props.game.roomId, this.state.input, this.props.game.username);
    this.setState({ input: '' });
  }

  render() {
    return (
      <div>
        <LocalForm style={style.form} onSubmit={() => this.send()}>
          <input
            value={this.state.input}
            onChange={(event) => this.change(event)}
          />
          <button type="submit">send</button>
        </LocalForm>
        {this.getChatlog()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chat: state.chat,
    socket: state.socket,
    game: state.game,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ newMessage, newUser, newGameMessage }, dispatch);
}

GameChat.propTypes = {
  chat: React.PropTypes.object.isRequired,
  socket: React.PropTypes.object.isRequired,
  game: React.PropTypes.object.isRequired,
  newMessage: React.PropTypes.func.isRequired,
  newUser: React.PropTypes.func.isRequired,
  newGameMessage: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(GameChat);
