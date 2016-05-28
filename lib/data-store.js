const EventEmitter = require('events');
const store = new EventEmitter();

let grudges = [
  { offender: 'brosef', offense: 'walking around shirtless for no reason' },
  { offender: 'other person', offense: 'something ridiculous' }
]


module.exports = store;
