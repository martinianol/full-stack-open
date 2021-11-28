import React from "react";

const Persons = ({ persons, nameFiltered }) => {
  return (
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
  )
}

export default Persons