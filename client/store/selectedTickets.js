import axios from 'axios'

/**
 * ACTION TYPES
 */
// const INIT_CART = 'INIT_CART'
const ADD_TICKETS = 'ADD_TICKETS'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_TICKETS = 'REMOVE_TICKETS'


/**
 * INITIAL STATE
 */
const initialState = {
  tickets: [],
}

/**
 * ACTION CREATORS
 */
//export const initCart = order => ({type: INIT_CART, order})
export const addTickets = tickets => ({type: ADD_TICKETS, tickets})
export const clearCart = () => ({type: CLEAR_CART, initialState})
export const removeTickets = ticketId => ({type: REMOVE_TICKET, ticketId})

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    // case INIT_CART:
    // return action
    
    case ADD_TICKETS:
    return Object.assign({}, state, {tickets: [...state.tickets, ...action.tickets]})
    
    case CLEAR_CART:
    return action;

    case REMOVE_TICKETS:
    return state.tickets.filter(ticket => ticket.id !== action.ticketId)
    //return state.tickets.filter(ticket => ticket.id !== action.ticket.id)

    default:
    return state
  }
}

/**
 * THUNK CREATORS
 */
// export const fetchCart = (userId) =>
//   dispatch =>
//     axios.get(`api/cart/${userId}`)
//       .then(res => res.data)
//       .then(order => {
//         const orderId = order.id
//         const tickets = order.tickets
//         dispatch(initCart({orderId, tickets}))
//       })
//       .catch(err => console.log(err))

// export const createCart = (userId, tickets) =>
//   dispatch =>
//     axios.post(`/api/cart/${userId}`)
//       .then(res => res.data)
//       .then(order => {
//         const orderId = order.id
//         const tickets = order.tickets
//         dispatch(initCart({orderId, tickets}))
//       })

// export const addSelectedTicket = (orderId, tickets) =>
//   dispatch =>
//     axios.put(`/api/tickets/${orderId}`, tickets)
//     .then(res => res.data)
//     .then(updatedOrder => updatedOrder.tickets)
//     .then(tickets => dispatch(addTickets(tickets)))
//     .catch(err => console.log(err))

// export const removeTicketFromOrder = (orderId, tickets) =>
//   dispatch =>
//     axios.delete(`/api/orders/${orderId}`, tickets, )
//     .then(res => res.data)
//     .then(updatedOrder => updatedOrder.tickets)
//     .then(tickets => dispatch(removeTickets(tickets)))
//     .catch(err => console.log(err))
    
  
// export const submitOrder = (orderId) =>
//   dispatch =>
//     axios.put(`/api/orders/${orderId}/complete`)
//     .then(() => dispatch(clearCart()))
//     .catch(err => console.log(err))

