import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { LocalForm } from 'react-redux-form';
import { newMessage, newUser } from '../actions/index.js';

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
  memberBox: {
    display: 'flex',
  },
  fontOne: {
    color: 'grey',
  },
  you: {
    margin: '0px',
  },
  otherUser: {
    margin: '0px',
  },
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  componentDidMount() {
    this.props.socket.socket.on('newMessage', (id, username, message) => {
      this.props.newMessage(id, username, message);
    });
    this.props.socket.socket.on('newUser', (id, username) => {
      this.props.newUser(id, username);
    });
  }

  getMembers() {
    return this.props.chat.members.map((item, i) => {
      return <p style={style.fontOne} key={i}>Members: {item[1]}</p>;
    });
  }

  getChatlog() {
    return this.props.chat.chatlog.map((item, i) => {
      switch (item[0]) {
        case 0 : {
          return <p key={i} style={style.you}>{item[2]}</p>;
        }
        case 1 : {
          return <p key={i} style={style.otherUser}>{item[1]} : {item[2]}</p>;
        }
        case 2 : {
          return <p key={i} style={style.server}>{item[1]} {item[2]}</p>;
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
    this.props.socket.socket.emit('send', this.state.input, this.props.game.username);
    this.setState({ input: '' });
  }

  render() {
    return (
      <div>
        <div style={style.memberBox}>
          {this.getMembers()}
        </div>
        {this.getChatlog()}
        <LocalForm style={style.form} onSubmit={() => this.send()}>
          <input
            value={this.state.input}
            onChange={(event) => this.change(event)}
          />
          <button type="submit">send</button>
        </LocalForm>
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
  return bindActionCreators({ newMessage, newUser }, dispatch);
}

Chat.propTypes = {
  chat: React.PropTypes.object.isRequired,
  socket: React.PropTypes.object.isRequired,
  game: React.PropTypes.object.isRequired,
  newMessage: React.PropTypes.func.isRequired,
  newUser: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(Chat);
