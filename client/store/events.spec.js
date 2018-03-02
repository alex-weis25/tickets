/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchEvents, fetchEvent} from './events'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    events: [],
    selectedEvent: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchEvents', () => {
    xit('eventually dispatches the GOT_EVENTS action', () => {
      // pending: add multiple events below
      const fakeEvents = { name: 'Three 6 Mafia'}
      mockAxios.onGet('/api/events').replyOnce(200, fakeEvents)
      return store.dispatch(fetchEvents())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GOT_EVENTS')
          expect(actions[0].events).to.eql(fakeEvents)
        })
    })
  })

  describe('fetchEvent', () => {
    xit('eventually dispatches the SELECT_EVENT action', () => {
      const fakeEvent = { name: 'Bon Iver'}
      mockAxios.onGet('/api/events/1').replyOnce(200, fakeEvent)
      return store.dispatch(fetchEvent())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('SELECT_EVENT')
          expect(actions[0].selectedEvent).to.eql(fakeEvent)
        })
    })
  })
})
