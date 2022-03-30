import axios from 'axios'

import { API_BASE_URL, ACCESS_TOKEN } from 'constants'

export function userInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
  return instance
}

export function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  })
  return instance
}
