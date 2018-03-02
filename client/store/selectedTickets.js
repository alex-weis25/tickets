import axios from 'axios'

/**
 * ACTION TYPES
 */
// const INIT_CART = 'INIT_CART'
const ADD_SELECTED_TICKETS = 'ADD_SELECTED_TICKETS'
const CLEAR_SELECTED_TICKETS = 'CLEAR_SELECTED_TICKETS'
const REMOVE_SELECTED_TICKETS = 'REMOVE_SELECTED_TICKETS'


/**
 * INITIAL STATE
 */
const initialState = [];


/**
 * ACTION CREATORS
 */
export const addSelectedTickets = tickets => ({type: ADD_SELECTED_TICKETS, tickets})
export const clearSelectedTickets = () => ({type: CLEAR_SELECTED_TICKETS, initialState})
export const removeSelectedTickets = ticketId => ({type: REMOVE_SELECTED_TICKETS, ticketId})

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    
    case ADD_SELECTED_TICKETS:
    return [...state, ...action.tickets]
    
    case CLEAR_SELECTED_TICKETS:
    return initialState;

    case REMOVE_SELECTED_TICKETS:
    return state.filter(ticket => ticket.id !== action.ticketId)

    default:
    return state
  }
}
