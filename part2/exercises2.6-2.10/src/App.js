import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFiltered, setNameFiltered] = useState('');
  const [nameMessage, setNameMessage] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault();

    if (newName === '') {
      return alert('Please enter a valid name')
    }
    if (newNumber === '') {
      return alert('Please enter a valid number')
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    let personAlreadyInPhoneBook = persons.find(person => person.name === newName)

    if (personAlreadyInPhoneBook !== undefined) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        personsService
          .update(personAlreadyInPhoneBook.id, personObject)
          .then(updatedPerson => {
            let personsTemp = persons.filter(person => person.id !== personAlreadyInPhoneBook.id)
            setPersons(personsTemp.concat(updatedPerson))
            setNameMessage(newName)
            setMessage('Modified')
            setTimeout(() => {
              setNameMessage(null)
              setMessage('')
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
        return

      } else {
        setNewName('')
        setNewNumber('')
        return
      }
    }

    personsService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNameMessage(newName)
        setMessage('Added')
        setTimeout(() => {
          setNameMessage(null)
          setMessage('')
        }, 5000)
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
      <Notification
        name={nameMessage}
        message={message}
      />
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
