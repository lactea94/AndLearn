import axios from 'axios'

import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index'

function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: localStorage.getItem(ACCESS_TOKEN),
    },
  })
  return instance
}

export { apiInstance }
