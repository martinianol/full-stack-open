import React from "react";

const Persons = ({ persons, nameFiltered, deletePerson }) => {

  return (
    <ul>
      {persons.map(person => {
        if (person.name.toLowerCase().includes(nameFiltered.toLowerCase())) {
          return <li key={person.id}>{person.name} {person.number}<button onClick={() => deletePerson(person)}>Delete</button></li>
        } else {
          return null
        }
      }
      )}
    </ul>
  )
}

export default Persons