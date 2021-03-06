import React, { Component } from 'react';
import "./app.css";
import Form from './components/Form';
import Recipes from './components/Recipes';

const API_KEY = "d1f5a3acae70dc33db0f071926bd9bc9";


class App extends Component {

  state = {
    recipes: []

  }
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}`);
   
    const data = await api_call.json();
    this.setState({ recipes: data.recipes })
    console.log(this.state.recipes);   
  }

  componentDidMount = () => {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    this.setState({ recipes });
    }

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes) 
  } 

  render() {
  return (
    <div className="App">
     <header className="App-header">
       <h1 className="App-title">Recipe Search</h1>
     </header>
     <Form getRecipe={this.getRecipe} />
     <Recipes recipes={this.state.recipes}/>
   
    </div>
    );
  }
}

export default App;
