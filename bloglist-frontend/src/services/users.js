import axios from 'axios'
const baseUrl = '/api/users'
let token = null


const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data

}

const getOne = async id => {
  const url = `${baseUrl}/${id}`

  const response = await axios.get(url)
  return response.data

}

const create = async userObject => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, userObject, config)
  return response.data

}

const update = async userObject => {
  const url = `${baseUrl}/${blogObject.id}`

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(url, userObject, config)
  return response.data

}

const destroy = async id => {
  const url = `${baseUrl}/${id}`

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(url, config)
  return response.status
}

export default {
  getAll,
  getOne,
  setToken,
  create,
  update,
  destroy
}