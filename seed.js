const Sequelize = require("sequelize");
const {
  db,
  Venue,
  User,
  Event,
  Review,
  Ticket,
  OrderLine,
  Order,
  Permission,
  PermissionRel
} = require("./server/db/models/index");

function getRandomImage(){
  let random = Math.floor(Math.random() * 1084);
  return `https://picsum.photos/600/400/?image=${random}`;
}

const venues = [
  {
    name: "Madison Square Garden",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "Madison Square Garden, often called 'MSG' or simply 'The Garden', is a multi-purpose indoor arena in the New York City borough of Manhattan.",
    imageUrl: getRandomImage()
  },
  {
    name: "Barclays Center",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "Madison Square Garden, often called 'MSG' or simply 'The Garden', is a multi-purpose indoor arena in the New York City borough of Manhattan.",
    imageUrl: getRandomImage()
  },
  {
    name: "Metlife Stadium",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "Madison Square Garden, often called 'MSG' or simply 'The Garden', is a multi-purpose indoor arena in the New York City borough of Manhattan.",
    imageUrl: getRandomImage()
  },
  {
    name: "Bowery Ballroom",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "Madison Square Garden, often called 'MSG' or simply 'The Garden', is a multi-purpose indoor arena in the New York City borough of Manhattan.",
    imageUrl: getRandomImage()
  },
  {
    name: "Apollo Theater",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "Madison Square Garden, often called 'MSG' or simply 'The Garden', is a multi-purpose indoor arena in the New York City borough of Manhattan.",
    imageUrl: getRandomImage()
  },
  {
    name: "Comedy Cellar",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "Madison Square Garden, often called 'MSG' or simply 'The Garden', is a multi-purpose indoor arena in the New York City borough of Manhattan.",
    imageUrl: getRandomImage()
  },
  {
    name: "Dizzy's Club",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "Madison Square Garden, often called 'MSG' or simply 'The Garden', is a multi-purpose indoor arena in the New York City borough of Manhattan.",
    imageUrl: getRandomImage()
  }
];

const users = [
  {
    email: "aweis@gmail.com",
    password: "123",
    firstName: "Alex",
    lastName: "Weis",
    creditCard: 123456789,
    adminStatus: true,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "newGuy@gmail.com",
    password: "123",
    firstName: "New",
    lastName: "guy",
    creditCard: 123456781,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "GeorgeCastanza@gmail.com",
    password: "123",
    firstName: "George",
    lastName: "Castanza",
    creditCard: 123456782,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "goodJokes@gmail.com",
    password: "123",
    firstName: "Jerry",
    lastName: "Seinfeld",
    creditCard: 123456783,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "tCruise@gmail.com",
    password: "123",
    firstName: "Tom",
    lastName: "Cruise",
    creditCard: 123456784,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "abc123@gmail.com",
    password: "123",
    firstName: "Michael",
    lastName: "Jackson",
    creditCard: 123456785,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "Kobe@gmail.com",
    password: "123",
    firstName: "Kobe",
    lastName: "Bryant",
    creditCard: 123456786,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "lGags@gmail.com",
    password: "123",
    firstName: "Lady",
    lastName: "Gaga",
    creditCard: 123456787,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "bono@gmail.com",
    password: "123",
    firstName: "Bono",
    lastName: "...",
    creditCard: 123456788,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "dGrohl@gmail.com",
    password: "123",
    firstName: "Dave",
    lastName: "Grohl",
    creditCard: 223456789,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "kCobain@gmail.com",
    password: "123",
    firstName: "Kurt",
    lastName: "Cobain",
    creditCard: 323456789,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "jHendrix@gmail.com",
    password: "123",
    firstName: "Jimi",
    lastName: "Hendrix",
    creditCard: 423456789,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "runninDownADream@gmail.com",
    password: "123",
    firstName: "Tom",
    lastName: "Petty",
    creditCard: 523456789,
    hasPassword: true,
    googleId: "321"
  },
  {
    email: "folk4lyfe@gmail.com",
    password: "123",
    firstName: "Bob",
    lastName: "Dylan",
    creditCard: 623456789,
    hasPassword: true,
    googleId: "321"
  }
];

const permissions = [
  {
    action: 'addEvent'
  },
  {
    action: 'addVenue'
  },
  {
    action: 'addTicket'
  }
]

const events = [
  {
    name: "Knicks vs. Lakers",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "New York Knicks host the Los Angeles Lakers for a regular season basketball game.",
    venueId: 1,
    imgUrl: getRandomImage()
  },
  {
    name: "Drake",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 3,
    description: "Live concert",
    venueId: 2,
    imgUrl: getRandomImage()
  },
  {
    name: "Louis C.K.",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description: "Stand-up comedy",
    venueId: 3,
    imgUrl: getRandomImage()
  },
  {
    name: "Funny show",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "New York Knicks host the Los Angeles Lakers for a regular season basketball game.",
    venueId: 4,
    imgUrl: getRandomImage()
  },
  {
    name: "IronChef Live",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "New York Knicks host the Los Angeles Lakers for a regular season basketball game.",
    venueId: 5,
    imgUrl: getRandomImage()
  },
  {
    name: "More sports!",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "New York Knicks host the Los Angeles Lakers for a regular season basketball game.",
    venueId: 1,
    imgUrl: getRandomImage()
  },
  {
    name: "Smooth Jazz",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "New York Knicks host the Los Angeles Lakers for a regular season basketball game.",
    venueId: 7,
    imgUrl: getRandomImage()
  },
  {
    name: "Open Mic",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "New York Knicks host the Los Angeles Lakers for a regular season basketball game.",
    venueId: 6,
    imgUrl: getRandomImage()
  },
  {
    name: "Monster Truck DEMOLITION",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "New York Knicks host the Los Angeles Lakers for a regular season basketball game.",
    venueId: 2,
    imgUrl: getRandomImage()
  },
  {
    name: "eSports Live",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "New York Knicks host the Los Angeles Lakers for a regular season basketball game.",
    venueId: 4,
    imgUrl: getRandomImage()
  }
];

const reviews = [
  {
    content: "This was fun!",
    rating: 5,
    eventId: 1,
    userId: 1
  },
  {
    content: "This was kinda fun!",
    rating: 4,
    eventId: 2,
    userId: 2
  },
  {
    content: "This was ok!",
    rating: 3,
    eventId: 3,
    userId: 4
  },
  {
    content: "This was meh!",
    rating: 2,
    eventId: 4,
    userId: 5
  },
  {
    content: "This was terrible!",
    rating: 0,
    eventId: 5,
    userId: 6
  },
  {
    content: "This was fun!",
    rating: 5,
    eventId: 6,
    userId: 1
  },
  {
    content: "This was kinda fun!",
    rating: 4,
    eventId: 7,
    userId: 8
  },
  {
    content: "This was ok!",
    rating: 3,
    eventId: 8,
    userId: 9
  },
  {
    content: "This was meh!",
    rating: 2,
    eventId: 9,
    userId: 12
  },
  {
    content: "This was terrible!",
    rating: 4,
    eventId: 10,
    userId: 7
  },
  {
    content: "This was terrible!",
    rating: 0,
    eventId: 1,
    userId: 13
  }
];

const tickets = [
  {
    price: 100,
    seat: "GA",
    eventId: 1,
    orderId: null,
    sellerId: 1
  },
  {
    price: 100,
    seat: "GA",
    eventId: 2,
    orderId: null,
    sellerId: 2
  },
  {
    price: 100,
    seat: "GA",
    eventId: 3,
    orderId: null,
    sellerId: 3
  },
  {
    price: 100,
    seat: "GA",
    eventId: 4,
    orderId: null,
    sellerId: 4
  },
  {
    price: 100,
    seat: "GA",
    eventId: 5,
    orderId: null,
    sellerId: 5
  },
  {
    price: 100,
    seat: "GA",
    eventId: 6,
    orderId: null,
    sellerId: 6
  },
  {
    price: 100,
    seat: "GA",
    eventId: 1,
    orderId: null,
    sellerId: 7
  },
  {
    price: 100,
    seat: "GA",
    eventId: 2,
    orderId: null,
    sellerId: 8
  },
  {
    price: 100,
    seat: "GA",
    eventId: 1,
    orderId: null,
    sellerId: 1
  },
  {
    price: 100,
    seat: "GA",
    eventId: 2,
    orderId: null,
    sellerId: 9
  },
  {
    price: 100,
    seat: "GA",
    eventId: 5,
    orderId: null,
    sellerId: 10
  },
  {
    price: 100,
    seat: "GA",
    eventId: 7,
    orderId: null,
    sellerId: 8
  },
  {
    price: 100,
    seat: "GA",
    eventId: 2,
    orderId: null,
    sellerId: 4
  },
  {
    price: 100,
    seat: "GA",
    eventId: 3,
    orderId: null,
    sellerId: 6
  },
  {
    price: 100,
    seat: "GA",
    eventId: 1,
    orderId: null,
    sellerId: 1
  },
  {
    price: 100,
    seat: "GA",
    eventId: 5,
    orderId: null,
    sellerId: 7
  }
];

const orders = [
  {
    status: 'in-cart',
    userId: 1
  },
  {
    status: 'in-cart',
    userId: 2
  },
  {
    status: 'in-cart',
    userId: 3
  },
  {
    status: 'in-cart',
    userId: 4
  }
];

const orderLines = [
  {
    orderId: 1,
    ticketId: 1
  },
  {
    orderId: 1,
    ticketId: 3
  },
  {
    orderId: 1,
    ticketId: 4
  },
  {
    orderId: 1,
    ticketId: 10
  },
  {
    orderId: 2,
    ticketId: 10
  },
  {
    orderId: 1,
    ticketId: 8
  },
  {
    orderId: 3,
    ticketId: 8
  },
  {
    orderId: 3,
    ticketId: 4
  },
]


const seed = () =>
  Promise.all(venues.map(venue => Venue.create(venue)))
    .then(() => Promise.all(users.map(user => User.create(user))))
    .then(() => Promise.all(events.map(event => Event.create(event))))
    .then(() => Promise.all(tickets.map(ticket => Ticket.create(ticket))))
    .then(() => Promise.all(reviews.map(review => Review.create(review))))
    .then(() => Promise.all(orders.map(order => Order.create(order))))
    .then(() => Promise.all(orderLines.map(orderLine => OrderLine.create(orderLine))))
    .then(() => Promise.all(permissions.map(perm => Permission.create(perm))))

const addPerms = () =>
  User.findAll({
    where: {
      adminStatus: true
    }
  })
  .then(foundUsers => Promise.all(foundUsers.map(user => addPermsToUsers(user))));

const addPermsToUsers = (user) =>
  Permission.findAll()
  .then(foundPerms => Promise.all(foundPerms.map(perm => user.addPermission(perm))));

const main = () => {
  console.log("Syncing db...");
  db
    .sync({ force: true })
    .then(() => {
      console.log("Seeding database...");
      return seed();
    })
    .then(() => {
      console.log("Setting Relationships...");
      return addPerms();
    })
    .then(() => console.log('Finished seeding database!'))
    .catch(err => {
      console.log("Error while seeding");
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
