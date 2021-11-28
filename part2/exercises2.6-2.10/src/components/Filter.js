import React from "react";

const Filter = ({ nameFiltered, handleFiltered }) => {
  return (
    <div>
      filter shown with <input value={nameFiltered} onChange={handleFiltered} />
    </div>
  )
}
export default Filter