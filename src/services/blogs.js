import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async blogObject  => {

  const config = {
    headers: {Authorization : token}
  }
  const response = await axios.post(baseUrl, blogObject, config)
  .catch(function (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error.request;
    } else {
      return error.message;
    }
  }) 
  return response
}

export default {
  getAll,
  createBlog,
  setToken
}