
import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_AUTHORS } from '../queries'
import BirthYearForm from './BirthYearForm'


const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const authors = props.authors
  console.log(authors)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthYearForm />

    </div>
  )
}

export default Authors
