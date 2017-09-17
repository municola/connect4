import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { LocalForm } from 'react-redux-form';
import { sendMessage } from '../actions/socketio.js';

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
    height: '7vh',
  },
  memberTitle: {
    color: 'white',
    fontSize: '27px',
    margin: '0px',
    marginRight: '10px',
  },
  chatlog: {
    height: '44vh',
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
  submit: {
    fontSize: '20px',
    width: '10%',
    border: 'none',
    margin: '0px',
    backgroundColor: '#a66037',
  },
  fontOne: {
    fontSize: '27px',
    margin: '0px',
    color: '#9FACCA',
    marginRight: '20px',
  },
  you: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  youFont: {
    fontSize: '25px',
    color: '#57699A',
    margin: '0px',
  },
  otherUserName: {
    fontSize: '12px',
    margin: '0px',
  },
  otherUserFont: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0px',
    fontSize: '25px',
    color: '#51659B',
  },
  serverFont: {
    fontSize: '25px',
    margin: '0px',
    color: 'white',
  },
};

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  getMembers() {
    return this.props.chat.members.map((item, i) => {
      return <p style={style.fontOne} key={i}>{item[1]}</p>;
    });
  }

  getChatlog() {
    return this.props.chat.chatlog.map((item, i) => {
      switch (item[0]) {
        case 0 : {
          return (
            <div style={style.you}>
              <p key={i} style={style.youFont}>{item[2]}</p>
            </div>
          );
        }
        case 1 : {
          return (
            <div key={i} style={style.otherUser}>
              <p style={style.otherUserFont}>{item[1]}: {item[2]}</p>
            </div>
          );
        }
        case 2 : {
          return (
            <div style={style.server}>
              <p key={i} style={style.serverFont}>{item[1]} {item[2]}</p>
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
      sendMessage(this.state.input, this.props.game.username);
      this.setState({ input: '' });
    }
  }

  render() {
    return (
      <div>
        <div style={style.memberBox}>
          <p style={style.memberTitle}>Members:</p>{this.getMembers()}
        </div>
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
    game: state.game,
  };
}

Chat.propTypes = {
  chat: React.PropTypes.object.isRequired,
  game: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Chat);
