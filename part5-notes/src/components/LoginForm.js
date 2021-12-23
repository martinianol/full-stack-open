const LoginForm = (props) => {
  const hideWhenVisible = { display: props.loginVisible ? 'none' : '' }
  const showWhenVisible = { display: props.loginVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => props.handleLoginVisible(true)}>log in</button>
      </div>

      <div style={showWhenVisible}>

        <form onSubmit={props.onSubmit}>
          <div>
            username
            <input
              type="text"
              value={props.username}
              name="Username"
              onChange={({ target }) => props.handleUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={props.password}
              name="Password"
              onChange={({ target }) => props.handlePassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
        <button onClick={() => props.handleLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

export default LoginForm