import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const CategoryList = ({ items }) => (
  <ul>
    {items.map((item, index) => <li key={index}>{item.label}</li>)}
  </ul>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      status: 'init',
      error: null
    }
  }

  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      status: 'init'
    }));

    fetch('http://localhost:3500/categories')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => ({
          ...prevState,
          status: 'success',
          categories: data
        }));
      })
      .catch(err => {
        console.log("Error", err)
        
        this.setState(prevState => ({
          ...prevState,
          status: 'failure',
          error: err
        }));
      });
  }

  render() {
    const { categories, status, error } = this.state;
    console.log('status', status);
    console.log('categories', categories);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Ajax Example</h2>
        </div>
        {status === 'pending' && <div>Loading...</div>}
        {status === 'failure' && <div>{error}</div>}
        {status === 'success' && <CategoryList items={categories} />}
      </div>
    );
  }
}

export default App;
