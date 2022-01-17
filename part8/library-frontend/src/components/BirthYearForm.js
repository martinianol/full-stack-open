import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { ALL_AUTHORS, EDIT_BIRTHDAY } from "../queries"

const BirthYearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBirthday, result] = useMutation(EDIT_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = (event) => {
    event.preventDefault()

    changeBirthday({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>

      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          Author's name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Year Born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>change birthday</button>
      </form>
    </div>
  )
}

export default BirthYearForm