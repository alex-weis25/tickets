import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_TICKETS = 'GOT_TICKETS'
const SELECT_TICKET = 'SELECT_TICKET'
const ADD_TICKET = 'ADD_TICKET'
const ADD_OR_UPDATE_FAILED = 'ADD_OR_UPDATE_FAILED';


/**
 * INITIAL STATE
 */
const initialState = {
  tickets: [],
  selectedTicket: {},
  redirectOnSubmitComplete: false,
  errorMessages: []
}

/**
 * ACTION CREATORS
 */
const gotTickets = tickets => ({type: GOT_TICKETS, tickets})
const selectTicket = ticket => ({type: SELECT_TICKET, ticket})
const addTicket = ticket => ({type: ADD_TICKET, ticket})
const addOrUpdateFailed = err => ({type: ADD_OR_UPDATE_FAILED, err})

/**
 * THUNK CREATORS
 */
export const fetchTickets = () =>
  dispatch =>
    axios.get('/api/tickets')
      .then(res =>
        dispatch(gotTickets(res.data)))
      .catch(err => console.log(err))

export const fetchTicket = (ticketId) =>
dispatch =>
  axios.get(`/api/tickets/${ticketId}`)
    .then(res =>
      dispatch(selectTicket(res.data)))
    .catch(err => console.log(err))

export const thunkAddTicket = (ticket) =>
  dispatch =>
    axios.post(`/api/tickets/`, ticket)
      .then(res => {
        if (!res.data.errors){
          return dispatch(addTicket(res.data))
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
    case GOT_TICKETS:
      return Object.assign({}, state, {tickets: action.tickets})

    case SELECT_TICKET:
      return Object.assign({}, state, {selectedTicket: action.ticket})

    case ADD_TICKET:
      return Object.assign({}, state, {tickets: [...state.tickets, action.ticket],
        selectedTicket: action.ticket,
        redirectOnSubmitComplete: true
      })

    case ADD_OR_UPDATE_FAILED:
      return Object.assign({}, state, {errorMessages: action.err})

    default:
      return state
  }
}
