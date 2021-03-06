import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {

  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>
              User
            </th>
            <th>
              Blogs Created
            </th>
          </tr>
          {users.map(user => {
            return (

              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div >
  )
}

export default Users