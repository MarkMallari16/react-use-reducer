import { useEffect, useReducer, useState } from 'react'

import './App.css'
import useFetch from './hooks/useFetch';
function reducer(state, action) {
  switch (action.type) {
    case "incremented_price": {
      const newPrice = Math.max(1, state.price + 1)
      return {
        ...state,
        price: newPrice,
        totalPrice: newPrice * state.quantity
      }

    }
    case "decremented_price": {
      const newPrice = Math.max(1, state.price - 1)
      return {
        ...state,
        price: newPrice,
        totalPrice: newPrice * state.quantity
      }

    }

    case "incremented_quantity": {
      const newQuantity = Math.max(0, state.quantity + 1);
      return {
        ...state,
        quantity: newQuantity,
        totalPrice: state.price * newQuantity
      }
    }
    case "decremented_quantity": {
      const newQuantity = Math.max(1, state.quantity - 1);
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
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }

}
function App() {

  const [state, dispatch] = useReducer(reducer, { price: 10, quantity: 2, sellerName: "Mark", age: 18, totalPrice: 10 })

  const { data } = useFetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  //"https://api.themoviedb.org/3/movie/popular?api_key=24ce4eec248652f741c228a1d8a1a21c"
  const handleIncrementedPrice = () => {
    dispatch({ type: "incremented_price" })
  }
  const handleDecrementedPrice = () => {
    dispatch({ type: "decremented_price" })
  }
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
    <div className='h-screen p-10'>
      <h1 className="text-2xl">Practicing Use Reducer</h1>
      <p>
        The current price of banana is ${state.price}
      </p>
      <div className="flex gap-3 mt-3">
        <button className='btn btn-error' onClick={handleDecrementedPrice}>Decremented Price</button>
        <button className='btn btn-primary' onClick={handleIncrementedPrice}>Increment Price</button>
      </div>
      <div className='flex gap-3 mt-3'>
        <button className='btn btn-error' onClick={handleDecrementedQuantity}>Decrement Quantity</button>
        <button className='btn btn-primary' onClick={handleIncrementedQuantity}>Increment Quantity</button>
      </div>
      <div className='mt-3'>
        <h1 className='text-2xl font-medium'>Summary</h1>
        <p>Product Price: {state.price}</p>
        <p>Product Quantity: {state.quantity}</p>
        <p>Total Price {state.totalPrice}</p>

      </div>
      <div>
        <div className='my-3'>
          <p>Name of the seller: {state.sellerName}</p>
          <input className='input input-bordered' type="text" value={state.sellerName} onChange={handleSellerName} />
        </div>
        <p>Hey {state.sellerName} you are {state.age} years old</p>
        <button className='btn btn-primary mt-1' onClick={handleAge} >Increase Age</button>
      </div>
    </div>
  )
}

export default App
