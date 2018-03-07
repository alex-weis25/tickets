import axios from 'axios'
import { clearSelectedTickets } from './index'
/**
 * ACTION TYPES
 */
const INIT_CART = 'INIT_CART'
const ADD_TICKETS = 'ADD_TICKETS'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_TICKETS = 'REMOVE_TICKETS'


/**
 * INITIAL STATE
 */
const initialState = {
  tickets: [],
  orderId: null,
}

/**
 * ACTION CREATORS
 */
const initCart = order => ({type: INIT_CART, order});
const addTickets = tickets => ({type: ADD_TICKETS, tickets});
export const clearCart = tickets => ({ type: CLEAR_CART, tickets });
const removeTickets = tickets => ({type: REMOVE_TICKETS, tickets});

/**
 * REDUCER
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_CART:
    return action.order

    case ADD_TICKETS:
    return Object.assign({}, state, {tickets: action.tickets})

    case CLEAR_CART:
    return initialState;

    case REMOVE_TICKETS:
    return Object.assign({}, {orderId: state.orderId}, {tickets: action.tickets})

    default:
    return state
  }
}

/**
 * THUNK CREATORS
 */
export const fetchCart = (userId) =>
  dispatch =>{
    userId ?
      axios.get(`/api/orders/cart/${userId}`)
       .then(res => res.data)
       .then(order => {
          if(order.id || order.tickets){
            const orderId = order.id
            const tickets = order.tickets
            dispatch(initCart({orderId, tickets}))
          }
        })
        .catch(err => console.log(err))
      : axios.get(`/api/session`)
        .then(res => res.data)
        .then(cart => dispatch(initCart(cart)))
        .catch(err => console.log(err))
  }

export const createCart = (user, tickets) =>
  dispatch => {
    user.email ?
    axios.post(`/api/orders/create`, {user, tickets})
      .then(res => res.data)
      .then(order => {
        if(order.id && order.tickets){
          const orderId = order.id
          const tickets = order.tickets
          dispatch(initCart({orderId, tickets}))
        }
      })
      .catch(err => console.log(err))
    : axios.post(`/api/session`, tickets)
      .then(res => res.data)
      .then(cart => dispatch(initCart(cart)))
      .catch(err => console.log(err))
  }

export const addTicketsToOrder = (orderId, tickets) =>
  dispatch =>
    orderId 
      ? axios.put(`/api/orders/${orderId}`, tickets)
        .then(res => res.data)
        .then(updatedOrder => updatedOrder.tickets)
        .then(tickets => dispatch(addTickets(tickets)))
        .then(_=> dispatch(clearSelectedTickets()))
        .catch(err => console.log(err))
      : axios.put(`/api/session`, tickets)
        .then(res => res.data)
        .then(updatedOrder => updatedOrder.tickets)
        .then(tickets => dispatch(addTickets(tickets)))
        .then(_=> dispatch(clearSelectedTickets()))
        .catch(err => console.log(err))

export const removeTicketFromOrder = (orderId, tickets) =>
  dispatch =>{
    console.log(tickets,"...tickets in thunk")
    orderId 
      ? axios.put(`/api/orders/remove/${orderId}`, tickets)
        .then(res => res.data)
        .then(updatedOrder => {
          console.log(updatedOrder,"...updatedOrder")
          return updatedOrder.tickets
        })
        .then(tickets => dispatch(removeTickets(tickets)))
        .then(_=> dispatch(clearSelectedTickets()))
        .catch(err => console.log(err))
      : axios.put(`/api/session/remove`, tickets)
        .then(res => res.data)
        .then(updatedOrder => {
          console.log(updatedOrder,"...updatedOrder")
          return updatedOrder.tickets
        })
        .then(tickets => dispatch(removeTickets(tickets)))
        .then(_=> dispatch(clearSelectedTickets()))
        .catch(err => console.log(err))
  }

export const submitOrder = (orderId) =>
  dispatch =>
    axios.put(`/api/orders/purchase/${orderId}`)
      .then(() => dispatch(clearCart()))
      .catch(err => console.log(err))