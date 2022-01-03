import { connect } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const VisibilityFilter = (props) => {

  return (
    <div>
      all
      <input
        type="radio"
        name="filter"
        onChange={() => props.filterChange('ALL')} />
      important
      <input
        type="radio"
        name="filter"
        onChange={() => props.filterChange('IMPORTANT')} />
      nonimportant
      <input
        type="radio"
        name="filter"
        onChange={() => props.filterChange('NONIMPORTANT')} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange
}

const ConnectedVisibilityFilter = connect(null, mapDispatchToProps)(VisibilityFilter)

export default ConnectedVisibilityFilter