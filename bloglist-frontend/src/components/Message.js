import React from 'react'

const Message = (props) => {

  let style

  const okStyle = {
    color: 'green'
  }

  const errorStyle = {
    color: 'red'
  }

  props.isError ? style = errorStyle : style = okStyle


  return (
    <div style={style}>{props.message}</div>
  )

}


export default Message