import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clickButton } from '../actions/index.js';

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
    console.log(this.props.tale.get(1));
    return this.props.tale.get(1).map((tales, index) => {
      return (
        <button
          onClick={() => this.props.clickButton(index)}
          style={style.button}
          key={index}
        >{this.props.tale.get(1)[index]}</button>
      );
    });
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
  return bindActionCreators({ clickButton }, dispatch);
}

App.propTypes = {
  tale: React.PropTypes.object.isRequired,
  talePast: React.PropTypes.array.isRequired,
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
