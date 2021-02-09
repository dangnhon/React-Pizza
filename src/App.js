import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    allPizzas: [], 
    selectedPizza: {}  
  }
  

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json()) 
    .then(pizzas => this.setState({
      allPizzas: pizzas 
    }))
  }

  handleClickEditPizza = (pizza) => {
    this.setState({
      selectedPizza: pizza 
    })
  }

// only tracks the topping and size
  trackChange = (e) => {
    e.persist()
    this.setState(prevState => {
      return {
      selectedPizza: {
        ...prevState.selectedPizza,
        [e.target.name]: e.target.value
      }
    }})
  }

// Tracks the boolean for vegetarian 
  trackChangeVeggie = (e) => {
    e.persist()

    let veggie 
    e.target.value === "Vegetarian" ? veggie = true : veggie = false

    this.setState(prevState => {
      return {
      selectedPizza: {
        ...prevState.selectedPizza,
        [e.target.name]: veggie
      }
    }})
  }

  handleUpdate = (e) => {

    let missingPizza = this.state.allPizzas.filter(pizza => pizza.id !== this.state.selectedPizza.id)

    fetch(`http://localhost:3000/pizzas/${this.state.selectedPizza.id}`, {
      method: "PATCH", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(this.state.selectedPizza)
    })
    .then(resp => resp.json())
    .then(updatedPizza => this.setState({
      allPizzas: [
        updatedPizza, 
        ...missingPizza 
      ]
    }))
  }


  render() {

    return (
      <Fragment>
        <Header/>
        <PizzaForm selectedPizza={this.state.selectedPizza} trackChange={this.trackChange} trackChangeVeggie={this.trackChangeVeggie} handleUpdate={this.handleUpdate} />
        <PizzaList allPizzas={this.state.allPizzas} handleClickEditPizza={this.handleClickEditPizza} />
      </Fragment>
    );
  }
}

export default App;
