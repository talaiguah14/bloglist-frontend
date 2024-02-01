import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log('credentials',credentials)
  console.log('baseUrl',baseUrl)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { login }