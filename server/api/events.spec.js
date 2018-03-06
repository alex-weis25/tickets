/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Event = db.model('event')
const User = db.model('user')
const Permission = db.model('permission')

describe('Event routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/events/', () => {
    const event = {
      name: "Knicks vs. Lakers",
      date: new Date(2018, 6, 18, 9, 30),
      duration: 2,
      description:
        "New York Knicks host the Los Angeles Lakers for a regular season basketball game.",
      // imgUrl: getRandomImage(),
      }

    const secondEvent = {
      name: "Drake",
      date: new Date(2018, 6, 18, 9, 30),
      duration: 3,
      description: "Live concert",
      id: 2
      // imgUrl: getRandomImage(),
    }

    beforeEach(() => {
      return Event.create(event);
    })

    it('GET /api/events', () => {
      return request(app)
        .get('/api/events')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(event.name)
        })
    })

    it('GET /api/events/1', () => {
      return request(app)
        .get('/api/events/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal(event.name);
        })
    })

    it('PUT /api/events/1', () => {
      const updateObj = {
        duration: 1
      }
      return request(app)
        .put('/api/events/1')
        .send(updateObj)
        .expect(200)
        .then(res => {
          return Event.findById(1);
      })
      .then(found => {
          expect(found.duration).to.equal(1);
      });
    })

    // it('DELETE /api/events', () => {
    //   return request(app)
    //     .delete('/api/events/')
    //     .send(secondEvent)
    //     .expect(201)
    //     .then(res => {
    //       return Event.findById(2);
    //   })
    //   .then(found => {
    //     expect(found.name).to.equal('Drake');
    //   });
    // })

    // review post route
    it('POST error due to invalid credentials', () => {
      return request(app)
        .post('/api/events/')
        .send(secondEvent)
        .expect(403)
    })

    it('POST added event due to correct credentials', () => {
      const testApp = request.agent(app)
      return (
     User.create({
        email: 'cody@gmail.com',
        firstName: 'Cody',
        lastName: 'User',
        adminStatus: true,
        password: '123'
      })
      .then(createdUser => {
        return Permission.create({
          action: 'addEvent'
        })
        .then(createdPermission => {
          return createdUser.addPermission(createdPermission)
        })
      })
      .then(() => {
        return testApp.post('/auth/login')
        .send({email: 'cody@gmail.com', password: '123'})
      })
      .then(() => testApp
        .post('/api/events/')
        .send(secondEvent)
        .expect(201)
        .then(res => {
          return Event.findById(secondEvent.id);
      })
    ))

      .then(found => {
        expect(found.name).to.equal('Drake');
      })
    })
  }) // end describe('/api/events')
}) // end describe('Event routes')
