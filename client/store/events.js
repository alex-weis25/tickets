import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_EVENTS = 'GOT_EVENTS'

/**
 * INITIAL STATE
 */
const initialState = {
  events: []
}

/**
 * ACTION CREATORS
 */
const gotEvents = events => ({type: GOT_EVENTS, events})


/**
 * THUNK CREATORS
 */
export const fetchEvents = () =>
  dispatch =>
    axios.get('/api/events')
      .then(res =>
        dispatch(gotEvents(res.data)))
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GOT_EVENTS:
      return Object.assign({}, state, {events: action.events})
    default:
      return state
  }
}
