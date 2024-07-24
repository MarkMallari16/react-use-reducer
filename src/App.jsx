import { useEffect, useReducer, useState } from 'react'

import './App.css'
import useFetch from './hooks/useFetch';
function reducer(state, action) {
  switch (action.type) {
    case "incremented_quantity": {
      const newQuantity = Math.max(0, state.quantity + 1);
      return {
        ...state,
        quantity: newQuantity,
        totalPrice: state.price * newQuantity
      }
    }
    case "decremented_quantity": {
      const newQuantity = Math.max(0, state.quantity - 1);
      return {
        ...state,
        quantity: newQuantity,
        totalPrice: state.price * newQuantity
      }
    }
    case "incremented_age": {
      return {
        ...state,
        age: state.age + 1
      }
    }
    case "changed_name": {
      return {
        ...state,
        sellerName: action.newName
      }
    }
    case "total_price": {
      return {
        ...state,
        totalPrice: state.price
      }
    }

    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }

}
function App() {

  const [state, dispatch] = useReducer(reducer, { price: 10, quantity: 2, sellerName: "Mark", age: 18, totalPrice: 10 })
 
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const API = "https://api.themoviedb.org/3/movie/popular?api_key=24ce4eec248652f741c228a1d8a1a21c";
  //     try {
  //       const response = await fetch(API);
  //       const data = await response.json();

  //       setMovies(data);
  //     } catch (error) {
  //       console.error("Failed to fetch movie data: ", error)
  //     }
  //   }
  //   fetchMovies();
  // }, [])

  const { data } = useFetch("https://pokeapi.co/api/v2/pokemon/pikachu");

  console.log(data)
  const handleIncrementedQuantity = () => {
    dispatch({ type: "incremented_quantity" })
  }
  const handleDecrementedQuantity = () => {
    dispatch({ type: "decremented_quantity" })
  }
  const handleSellerName = (e) => {
    dispatch({ type: "changed_name", newName: e.target.value });
  }
  const handleAge = () => {
    dispatch({ type: "incremented_age" })
  }

  return (
    <>
      <p>
        The current price of banana is ${state.price}
      </p>

      <button onClick={handleDecrementedQuantity}>Decrement Quantity</button>
      <button onClick={handleIncrementedQuantity}>Increment Quantity</button>
      <div>
        <h1>Summary</h1>
        <p>Product Price: {state.price}</p>
        <p>Product Quantity: {state.quantity}</p>
        <p>Total Price {state.totalPrice}</p>

      </div>


      <p>Name of the seller: {state.sellerName}</p>
      <input type="text" value={state.sellerName} onChange={handleSellerName} />
      <p>Hey {state.sellerName} you are {state.age} years old</p>
      <button onClick={handleAge}>Increase Age</button>
    </>
  )
}

export default App
