/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Venue = db.model('venue')

describe('Venue routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/venues/', () => {
    const venue =
      {
        name: "Madison Square Garden",
        streetAddress: "4 Pennsylvania Plaza",
        city: "New York",
        state: "NY",
        zip: "10001",
        description:
          "Madison Square Garden, often called 'MSG' or simply 'The Garden', is a multi-purpose indoor arena in the New York City borough of Manhattan.",
      }
    const secondVenue = {
      name: "Comedy Cellar",
      streetAddress: "4 Pennsylvania Plaza",
      city: "New York",
      state: "NY",
      zip: "10001",
      description:
        "Madison Square Garden, often called 'MSG' or simply 'The Garden', is a multi-purpose indoor arena in the New York City borough of Manhattan.",
    }

    beforeEach(() => {
      return Venue.create(venue);
    })

    it('GET /api/venues', () => {
      return request(app)
        .get('/api/venues')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(venue.name)
        })
    })

    it('GET /api/venues/1', () => {
      return request(app)
        .get('/api/venues/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal(venue.name);
        })
    })

    it('PUT /api/venues/1', () => {
      const updateObj = {
        city: 'Boston'
      }
      return request(app)
        .put('/api/venues/1')
        .send(updateObj)
        .expect(200)
        .then(res => {
          return Venue.findById(1);
      })
      .then(found => {
          expect(found.city).to.equal('Boston');
      });
    })

    it('POST /api/venues', () => {
      return request(app)
        .post('/api/venues/')
        .send(secondVenue)
        .expect(201)
        .then(res => {
          return Venue.findById(2);
      })
      .then(found => {
          expect(found.name).to.equal('Comedy Cellar');
      });
    })
  }) // end describe('/api/venues')
}) // end describe('Venue routes')
