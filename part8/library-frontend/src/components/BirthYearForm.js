import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { ALL_AUTHORS, EDIT_BIRTHDAY } from "../queries"
import Select from 'react-select';

const BirthYearForm = (props) => {

  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null);

  const [changeBirthday, result] = useMutation(EDIT_BIRTHDAY, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const options = props.authors.map(a => ({ value: a.name, label: a.name }))

  const submit = (event) => {
    event.preventDefault()
    let name = selectedOption.value

    changeBirthday({ variables: { name, born } })
    setSelectedOption(null)
    setBorn('')
  }


  return (
    <div>

      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          Author's name
          <Select
            onChange={setSelectedOption}
            options={options}
            value={selectedOption}
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