const Notification = ({ name, message }) => {

  const notificationStyle = {
    color: 'green',
    backgroundColor: 'lightGrey',
    fontStyle: 'bold',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (name === null) {
    return null
  }


  return (
    <div style={notificationStyle}>
      {message} {name}
    </div>
  )
}

export default Notification