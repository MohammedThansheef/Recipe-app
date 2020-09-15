import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {

  const APP_ID = '95c00fdf'
  const APP_KEY = '93ee08c86252d84b9d4c03e07793322d'

  const [recipes, setRecipes] = useState([])
  const [search, setSearch]= useState("")
  const [query, setQuery] = useState("chicken")
 
  useEffect(()=>{
      getRecipes()
  },[query])

  const getRecipes = async ()=>{
    const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await  response.json()

    setRecipes(data.hits)
    console.log(data.hits)
  }

  const updateSearch = (e)=>{
    setSearch(e.target.value)  
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
  }

  return (
    <div className="App">
        <div className="header">
          <nav className='headerMenu'>
                <a href="#">Home</a>
                <a href="#">About Us</a>
                <a href="#">Contact Us</a>
            </nav>
        </div>
        
        <h1> Welcome to Recipe App</h1>

        <form onSubmit={getSearch} className='search-form'>
          <input className='search-bar' type='text' placeholder="search for any recipe" value={search} onChange={updateSearch}/>
          <button className='search-button' type='submit'>Search</button>     
        </form>

        <div className='recipes'>
        { recipes.map (recipe =>(
          <Recipe 
            key= {recipe.recipe.label}
            title= {recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image ={recipe.recipe.image} 
            ingredients= {recipe.recipe.ingredients}
          />
        ))}
        </div>
    </div>
  );
}

export default App;
