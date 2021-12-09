import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFiltered, setNameFiltered] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`)
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personsService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })

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

  const deletePerson = (person) => {

    let { id } = person
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .destroy(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }

  }




  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameFiltered={nameFiltered}
        handleFiltered={handleFiltered}
      />
      <Form
        addNumber={addNumber}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        nameFiltered={nameFiltered}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
