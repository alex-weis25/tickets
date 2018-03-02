import axios from 'axios'

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
  dispatch =>
    axios.get(`api/users/cart/${userId}`)
      .then(res => res.data)
      .then(order => {
        if(!order) return undefined;
        const orderId = order.id
        const tickets = order.tickets
        dispatch(initCart({orderId, tickets}))
      })
      .catch(err => console.log(err))

export const createCart = (userId, tickets) =>
  dispatch =>
    axios.post(`/api/orders/users/${userId}`, tickets)
      .then(res => res.data)
      .then(order => {
        console.log(order,".....order")
        const orderId = order.id
        const tickets = order.tickets
        dispatch(initCart({orderId, tickets}))
      })

export const addTicketsToOrder = (orderId, tickets) =>
  dispatch =>
    axios.put(`/api/orders/${orderId}`, tickets)
    .then(res => res.data)
    .then(updatedOrder => updatedOrder.tickets)
    .then(tickets => dispatch(addTickets(tickets)))
    .catch(err => console.log(err))

export const removeTicketFromOrder = (orderId, tickets) =>
  dispatch =>
    axios.delete(`/api/orders/${orderId}`, tickets)
    .then(res => res.data)
    .then(updatedOrder => updatedOrder.tickets)
    .then(tickets => dispatch(removeTickets(tickets)))
    .catch(err => console.log(err))


export const submitOrder = (orderId) =>
  dispatch =>
    axios.put(`/api/orders/purchase/${orderId}`)
    .then(() => dispatch(clearCart()))
    .catch(err => console.log(err))

