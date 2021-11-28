import React from "react";

const Form = ({ addNumber, newName, handlePersonChange, newNumber, handleNumberChange }) => {

  return (
    <form onSubmit={addNumber}>
      <h2>add a new</h2>
      <div>
        name: <input value={newName} onChange={handlePersonChange} />
      </div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form