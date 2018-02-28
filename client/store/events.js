import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_EVENTS = 'GOT_EVENTS'
const SELECT_EVENT = 'SELECT_EVENT'


/**
 * INITIAL STATE
 */
const initialState = {
  events: [],
  selectedEvent: {}
}

/**
 * ACTION CREATORS
 */
const gotEvents = events => ({type: GOT_EVENTS, events})
const selectEvent = event => ({type: SELECT_EVENT, event})

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

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_EVENTS:
      return Object.assign({}, state, {events: action.events})

    case SELECT_EVENT:
      return Object.assign({}, state, {selectedEvent: action.event})

      default:
      return state
  }
}
