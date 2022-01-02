import React from 'react'
import { useDispatch } from 'react-redux'
import { filterSet } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const contentToFilter = event.target.value
    console.log(contentToFilter)
    dispatch(filterSet(contentToFilter))

  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter