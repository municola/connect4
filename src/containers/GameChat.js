import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { LocalForm } from 'react-redux-form';
import {
} from '../actions/index.js';

const style = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  chatlog: {
    height: '93%',
    overflowY: 'auto',
    bottom: '0',
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    backgroundColor: '#9FACCA',
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '5vh',
    marginTop: '1vh',
    marginBottom: '1vh',
  },
  input: {
    color: '#076689',
    fontSize: '20px',
    width: '100%',
    border: 'none',
    margin: '0px',
    paddingLeft: '10px',
    backgroundColor: 'white',
  },
  you: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  youFont: {
    fontSize: '25px',
    color: '#57699A',
    margin: '0px',
  },
  otherUser: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  otherUserFont: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px',
    fontSize: '25px',
    color: '#076689',
  },
  chatFont: {
    margin: '0px',
    color: '#FBC75A',
  },
  serverFont: {
    fontSize: '25px',
    margin: '0px',
    color: 'white',
  },
};

class GameChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  getChatlog() {
    return this.props.chat.gamechatlog.map((item, i) => {
      switch (item[0]) {
        case 0 : {
          return <div style={style.you} key={i}><p style={style.youFont}>{item[2]}</p></div>;
        }
        case 1 : {
          return (
            <div style={style.otherUser} key={i}>
              <p style={style.otherUserFont}>{item[1]} : {item[2]}</p>
            </div>
          );
        }
        case 2 : {
          return (
            <div style={style.server} key={i}>
              <p style={style.serverFont}>{item[1]} {item[2]}</p>
            </div>
          );
        }
        default : {
          return false;
        }
      }
    });
  }

  @autobind
  change(event) {
    this.setState({ input: event.target.value });
  }

  @autobind
  send() {
    if (this.state.input !== '') {
      this.props.socket.socket.emit(
        'gameMessage', this.props.game.roomId, this.state.input, this.props.game.username);
      this.setState({ input: '' });
    }
  }

  render() {
    return (
      <div style={style.container}>
        <div style={style.chatlog}>
          {this.getChatlog()}
        </div>
        <LocalForm style={style.form} onSubmit={() => this.send()}>
          <input
            autoFocus
            placeholder="Type your message..."
            style={style.input}
            value={this.state.input}
            onChange={(event) => this.change(event)}
          />
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
  return bindActionCreators({
  }, dispatch);
}

GameChat.propTypes = {
  chat: React.PropTypes.object.isRequired,
  socket: React.PropTypes.object.isRequired,
  game: React.PropTypes.object.isRequired,
  newUser: React.PropTypes.func.isRequired,
  newGameMessage: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(GameChat);
