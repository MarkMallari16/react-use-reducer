import { useReducer } from 'react'

import './App.css'
function reducer(state, action) {
  switch (action.type) {
    case "incremented_price": {
      return {
        ...state,
        price: Math.max(0, state.price + 10)
      }
    }
    case "decremented_price": {
      return {
        ...state,
        price: Math.max(0, state.price - 10)
      }
    }
    case "incremented_age": {
      return {
        ...state,
        sellerName: state.sellerName,
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
  const [state, dispatch] = useReducer(reducer, { price: 10, sellerName: "Mark", age: 18 })

  const handleIncrementedPrice = () => {
    dispatch({ type: "incremented_price" })
  }
  const handleDecrementedPrice = () => {
    dispatch({ type: "decremented_price" })
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

      <button onClick={handleDecrementedPrice}>Decrease Price</button>
      <button onClick={handleIncrementedPrice}>Increase Price</button>
      <p>Name of the seller: {state.sellerName}</p>
      <input type="text" value={state.sellerName} onChange={handleSellerName} />
      <p>Hey {state.sellerName} you are {state.age} years old</p>
      <button onClick={handleAge}>Increase Age</button>
    </>
  )
}

export default App
