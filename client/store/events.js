import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_EVENTS = 'GOT_EVENTS'
const SELECT_EVENT = 'SELECT_EVENT'
const ADD_EVENT = 'ADD_EVENT'
const ADD_TICKETS = 'ADD_TICKETS'
const ADD_OR_UPDATE_FAILED = 'ADD_OR_UPDATE_FAILED';

/**
 * INITIAL STATE
 */
const initialState = {
  events: [],
  selectedEvent: {},
  redirectOnSubmitComplete: false,
  errorMessages: []
}

/**
 * ACTION CREATORS
 */
const gotEvents = events => ({type: GOT_EVENTS, events})
const selectEvent = event => ({type: SELECT_EVENT, event})
const addEvent = event => ({type: ADD_EVENT, event})
const addTickets = tickets => ({type: ADD_TICKETS, tickets})
const addOrUpdateFailed = err => ({type: ADD_OR_UPDATE_FAILED, err})

/**
 * THUNK CREATORS
 */
export const fetchEvents = () =>
  dispatch =>
    axios.get('/api/events')
      .then(res =>
        dispatch(gotEvents(res.data)))
      .catch(err => console.log(err))

export const fetchEvent = (eventId) =>
dispatch =>
  axios.get(`/api/events/${eventId}`)
    .then(res =>
      dispatch(selectEvent(res.data)))
    .catch(err => console.log(err))

export const thunkAddEvent = (event) =>
  dispatch =>
    axios.post(`/api/events/`, event)
      .then(res => {
        // console.log('response in thunkAddEvent', res);
        if (!res.data.errors){
          return dispatch(addEvent(res.data))
        } else {
          let errorArr = res.data.errors.map(err => err.message)
          return dispatch(addOrUpdateFailed(errorArr))
        }
      })
      .catch(err => console.log(err))

  export const thunkAddTickets = (tickets) =>
  dispatch =>
    axios.post(`/api/events/tickets`, tickets)
      .then(res => {
        if (!res.data.errors){
          console.log(res.data);
          // return dispatch(addTickets(res.data))
        } else {
          let errorArr = res.data.errors.map(err => err.message)
          return dispatch(addOrUpdateFailed(errorArr))
        }
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_EVENTS:
      return Object.assign({}, state, {events: action.events})

    case SELECT_EVENT:
      return Object.assign({}, state, {selectedEvent: action.event})

    case ADD_EVENT:
      return Object.assign({}, state, {events: [...state.events, action.event],
        selectedEvent: action.event,
        redirectOnSubmitComplete: true
      })

    case ADD_OR_UPDATE_FAILED:
      return Object.assign({}, state, {errorMessages: action.err})

    default:
      return state
  }
}
