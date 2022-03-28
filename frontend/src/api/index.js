import axios from 'axios'

import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index'

function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      accessToken: ACCESS_TOKEN,
    },
  })
  return instance
}
const api = apiInstance()

function onCheckingEmail(param, success, fail) {
  api
    .post(API_BASE_URL + '/api/v1/users/duplicate-check-id', param)
    .then(success)
    .catch(fail)
}
function onCheckingName(param, success, fail) {
  
}

export { apiInstance, onCheckingEmail, onCheckingName }
