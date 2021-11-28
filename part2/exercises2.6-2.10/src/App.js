import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState(
    [
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]
  )
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFiltered, setNameFiltered] = useState('');

  const addNumber = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`)
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltered = (event) => {
    setNameFiltered(event.target.value)
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={nameFiltered} onChange={handleFiltered} />
      </div>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => {

          if (person.name.toLowerCase().includes(nameFiltered.toLowerCase())) {
            return <li key={person.id}>{person.name} {person.number}</li>
          } else {
            return null
          }



        }
        )}
      </ul>
    </div>
  )
}

export default App
