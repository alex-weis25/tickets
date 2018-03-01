/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {default as reducer, INIT_CART, ADD_TICKETS, CLEAR_CART, REMOVE_TICKETS} from './cart'

describe('cart reducer', () => {
  xit('starts off with []', () => {
    const initialState = reducer(undefined, {type: '@@INIT'})
    expect(initialState).to.eql([])
  })
  xit('responds to INIT_CART with the cart', () => {
    const cart = reducer(undefined, {
      type: INIT_CART,
      cart: []
    })
    expect(cart).to.eql([])
  })

  xit('responds to ADD_TICKETS by adding tickets the cart', () => {
    const initialCart = [1, 2, 3]
    const tickets = reducer(initialCart, {
      type: ADD_TICKETS,
      tickets: 10
    })
    expect(initialCart).to.eql([1, 2, 3], 'creates initial cart')
    expect(tickets).to.eql([1, 2, 3, 10], 'appends the cart')
    expect(tickets).not.to.equal(initialCart, 'does not modify the state')
  })

  xit('responds to CLEAR_CART by clearing the cart', () => {
    const initialCart = [1, 2, 3]
    // review code below
    const tickets = reducer(initialCart, {
      type: CLEAR_CART,
    })
    expect(initialCart).to.eql([1, 2, 3], 'creates initial cart')
    expect( ).to.eql([], 'clears the cart')
  })

  xit('responds to REMOVE_TICKETS by removing tickets the cart', () => {
    const initialCart = [1, 2, 3]
    const tickets = reducer(initialCart, {
      type: REMOVE_TICKETS,
      tickets: 3
    })
    expect(initialCart).to.eql([1, 2, 3], 'creates initial cart')
    expect(tickets).to.eql([1, 2], 'appends the cart')
    expect(tickets).not.to.equal(initialCart, 'does not modify the state')
  })
})
