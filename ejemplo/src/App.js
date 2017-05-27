import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    }
  }

  mouseDownHandler() {
    this.setState({
      pressed: true
    }, () => {
      this.props.onClick({
        pressed: this.state.pressed
      });
    });
  }

  mouseUpHandler() {
    this.setState({
      pressed: false
    }, () => {
      this.props.onClick({
        pressed: this.state.pressed
      });
    });
  }

  onMouseEnterHandler() {
    this.props.onClick({
      pressed: this.state.pressed
    });
  }

  onMouseOutHandler() {
    this.props.onClick({
      pressed: this.state.pressed
    });
  }

  onClickHandler() {
    this.props.onClick({
      pressed: this.state.pressed
    });
  }

  render() {
    return (
      <button
        onClick={()=>this.onClickHandler()}
        onMouseDown={()=>this.mouseDownHandler()}
        onMouseUp={()=>this.mouseUpHandler()}
        onMouseEnter={()=>this.onMouseEnterHandler()}
        onMouseOut={()=>this.onMouseOutHandler()}
      >
        { this.props.children }
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      intervalId: null,
      pressed: false
    };
  }

  increase = () => {
    this.setState({
      value: this.state.value+1
    });
  }

  decrease = () => {
    this.setState({
      value: this.state.value-1
    });
  }

  cleanIntervalId() {
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: null
    });
  }

  mouseDownHandler = (type) => {
    let operation = null;
    
    if (type === 'inc') {
      operation = this.increase;
    } else if (type === 'dec') {
      operation = this.decrease;
    }

    const intervalId = setInterval(operation, 300);
    this.setState({
      intervalId: intervalId,
      pressed: true
    });
  }

  mouseUpHandler = () => {
    this.cleanIntervalId()
  }

  render() {
    const { value } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={()=>this.increase}>+</Button>
        <div>{value}</div>
        <Button onClick={()=>this.decrease}>-</Button>
      </div>
    );
  }
}

export default App;
