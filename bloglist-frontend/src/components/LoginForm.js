import React, { useEffect, useState } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)

    let credentials = {
      username,
      password
    }
    await props.onSubmit(credentials)

  }

  useEffect(() => {
    setUsername('')
    setPassword('')
  }, [])


  return (
    <form onSubmit={loginUser}>
      <h2>login into application</h2>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="button-login" type="submit">login</button>
    </form>

  )
}

export default LoginForm