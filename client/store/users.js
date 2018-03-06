import axios from 'axios'
import history from '../history'
import {fetchCart} from './cart'
/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const allUsers = []

/**
 * ACTION CREATORS
 */
const getUsers = users => ({type: GET_USERS, users})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */

export const fetchUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(users => {
        dispatch(getUsers(users.data))
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = allUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return [...action.users]
    default:
      return state
  }
}
