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
  const [colorMessage, setColorMessage] = useState('green')

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
            setNameMessage(newName)
            let personsTemp = persons.filter(person => person.id !== personAlreadyInPhoneBook.id)
            setPersons(personsTemp.concat(updatedPerson))
            setMessage('Modified')
            setNewName('')
            setNewNumber('')
          })

          .catch(error => {
            setNameMessage(newName)
            setMessage('Information has already been removed of user')
            setColorMessage('red')
            setTimeout(() => {
              setNameMessage(null)
              setMessage('')
              setColorMessage('green')
            }, 3000)
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
      .then(response => {
        setPersons(response)
        setNameMessage(newName)
        setMessage('Added')
        setTimeout(() => {
          setNameMessage(null)
          setMessage('')
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error.response.data)
        setNameMessage('Error')
        setMessage(error.response.data.error)
        setColorMessage('red')
        setTimeout(() => {
          setNameMessage(null)
          setMessage('')
          setColorMessage('green')
        }, 5000)
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
          setNameMessage(person.name)
          setMessage('Deleted')
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setNameMessage(null)
            setMessage('')
          }, 3000)
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        name={nameMessage}
        message={message}
        colorMessage={colorMessage}
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
