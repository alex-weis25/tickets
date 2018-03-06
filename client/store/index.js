import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import events from './events'
import cart from './cart'
import selectedTickets from './selectedTickets'

const reducer = combineReducers({user, events, cart, selectedTickets})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './events'
export * from './cart'
export * from './selectedTickets'
