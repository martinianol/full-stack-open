import React from 'react'
import { connect } from 'react-redux'
import { filterSet } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const contentToFilter = event.target.value
    props.filterSet(contentToFilter)

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

const mapDispatchToProps = {
  filterSet
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter