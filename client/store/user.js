import axios from 'axios'
import history from '../history'
import { fetchCart } from './cart'
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_EMAIL = 'ADD_EMAIL'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
export const addEmail = email => ({type: ADD_EMAIL, email})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => res.data)
      .then(user => {
        dispatch(getUser(user || defaultUser))
        return user.id
      })
      .then(userId=> dispatch(fetchCart(userId)))
      .catch(err => console.log(err))

export const auth = (userInfo, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, userInfo)
      .then(res => res.data)
      .then(user => {
        dispatch(getUser(user))
        history.push('/')
        return user.id
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .then(userId=> dispatch(fetchCart(userId)))
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

//To set password after google auth sign in
export const authPassword = (userInfo, method) =>
dispatch => {
  axios.put(`/auth/${method}`, userInfo)
    .then(res => {
      console.log('user received', res.data);
      dispatch(getUser(res.data))
      history.push('/home')
    })
}



export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))



/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case ADD_EMAIL:
      return Object.assign({}, state, {email: action.email})
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
