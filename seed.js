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
  Permission
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
    imageUrl: 'https://www.msg.com/madison-square-garden'
  },
  {
    name: "Barclays Center",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "Barclays Center is a multi-purpose indoor arena in the New York City borough of Brooklyn. The arena is part of a $4.9 billion future business and residential complex now known as Pacific Park.",
    imageUrl: 'http://www.barclayscenter.com/assets/img/about-1170x450-d9c047de75.jpg'
  },
  {
    name: "Metlife Stadium",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "MetLife Stadium is an American sports stadium located in East Rutherford, New Jersey. It is part of the Meadowlands Sports Complex and serves as the home stadium for two National Football League franchises: the New York Giants and the New York Jets.",
    imageUrl: 'https://blog.tickpick.com/metlife-stadium-seating-chart/'
  },
  {
    name: "Bowery Ballroom",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "The Bowery Ballroom is a music venue in the Bowery section of Manhattan, New York City. The structure, at 6 Delancey Street, was built just before the Wall Street Crash in 1929.",
    imageUrl: 'https://www.nycgo.com/images/venues/4506/livemusic_cmj_2012_bowery_ballroom_joe_buglewicz_2315__large.jpg'
  },
  {
    name: "Apollo Theater",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "The Apollo Theater at 253 West 125th Street between Adam Clayton Powell Jr. Boulevard and Frederick Douglass Boulevard in the Harlem neighborhood of Manhattan, New York City is a music hall which is a noted venue for African-American performers.",
    imageUrl: 'http://www.mjworld.net/news/2016/05/31/michael-to-be-honoured-by-apollo-theatre/'
  },
  {
    name: "Comedy Cellar",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "The Comedy Cellar is a comedy club in Manhattan where many top New York comedians perform. It was founded in 1982 by then standup comedian, and current television writer/producer Bill Grundfest.",
    imageUrl: 'http://theinterrobang.com/comedy-cellar-owner-noam-dworman-every-good-comic-in-the-city-is-working-at-the-cellar/'
  },
  {
    name: "Dizzy's Club",
    streetAddress: "4 Pennsylvania Plaza",
    city: "New York",
    state: "NY",
    zip: "10001",
    description:
      "Upscale, intimate jazz club in Lincoln Center serving Southern-accented fare & themed cocktails.",
    imageUrl: 'https://i.gse.io/gse_media/117/0/1485381010-Dizzys-Club-Coca-Cola-tickets.jpg?h=520&p=1&q=60&w=920&c=1'
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
    date: new Date(2018, 1, 18, 9, 30),
    duration: 2,
    description:
      "New York Knicks host the Los Angeles Lakers for a regular season basketball game.",
    venueId: 1,
    imgUrl: 'https://www.getmoresports.com/los-angeles-lakers-vs-new-york-knicks-odds/'
  },
  {
    name: "Drake",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 3,
    description: "In the world of hip hop music, there aren't many names bigger than Drake. Come watch the man live in concert",
    venueId: 2,
    imgUrl: 'https: //www.billboard.com/articles/columns/hip-hop/7510311/drake-kevin-durant-oakland-concert-golden-state-warriors'
  },
  {
    name: "Dave Chappelle",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description: "Stand-up comedy",
    venueId: 5,
    imgUrl: 'https://bombanoise.com/wp-content/uploads/2018/01/david-chappelle.jpg'
  },
  {
    name: "Fat Joe",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "Fat Joe live in concert",
    venueId: 4,
    imgUrl: 'https://www.billboard.com/files/media/fat-joe-bet-03-awards-2017-billboard-ap-1548.jpg'
  },
  {
    name: "IronChef Gauntlet",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "Seven chefs from around the country battle each other in an elimination contest, with the last chef remaining then facing a challenge of defeating three Iron Chefs — Bobby Flay, Masaharu Morimoto and Michael Symon — in order to earn the title of Iron Chef.",
    venueId: 5,
    imgUrl: 'http://insider.directv.com/wp-content/uploads/2017/04/309892_lg_news_Iron_Chef_Gauntlet_Food_Network_gm.jpeg'
  },
  {
    name: "Knicks vs. Cavs",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "New York Knicks host the Cleveland Caveliers for a regular season basketball game.",
    venueId: 1,
    imgUrl: 'https://i.ytimg.com/vi/IaDwZ_iaKnM/maxresdefault.jpg'
  },
  {
    name: "Smooth Jazz",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "Sexy show with some silky smooth jazz.",
    venueId: 7,
    imgUrl: 'http://i.imgur.com/UZYHcjn.jpg'
  },
  {
    name: "Open Mic",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "Open Mic, amateur hour.",
    venueId: 6,
    imgUrl: 'https://harmonyhousetheatre.com/wp-content/uploads/2017/10/Open-Mic.jpg'
  },
  {
    name: "Monster Truck DEMOLITION",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "Monster trucks DEMO- smashing and bashing.",
    venueId: 2,
    imgUrl: 'http://961wodz.com/files/2014/07/1597571-630x416.jpg?w=980&q=75'
  },
  {
    name: "eSports Live",
    date: new Date(2018, 6, 18, 9, 30),
    duration: 2,
    description:
      "See pros battle for glory live.",
    venueId: 4,
    imgUrl: 'https://44s2n02i19u61od84f3rzjqx-wpengine.netdna-ssl.com/wp-content/uploads/2015/08/Helena-Kristiansson-LoL-All-Star-Paris-2-800x500_c.jpg'
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
    userId: 1,
    orderEmail: 'test@example.com'
  },
  {
    status: 'in-cart',
    userId: 2,
    orderEmail: 'test@example.com'
  },
  {
    status: 'in-cart',
    userId: 3,
    orderEmail: 'test@example.com'
  },
  {
    status: 'in-cart',
    orderEmail: 'test@example.com'
  },
  {
    status: 'purchased',
    userId: 5,
    orderEmail: 'test@example.com'
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
