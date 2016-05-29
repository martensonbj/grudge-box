const EventEmitter = require('events');
const store = new EventEmitter();

let grudges = [
  { offender: 'brosef', offense: 'walking around shirtless for no reason', id: Date.now() },
  { offender: 'other person', offense: 'something ridiculous', id: Date.now() }
];

store.all = () => grudges.concat([]);

store.createGrudge = (newGrudge) => grudges.concat(newGrudge);


module.exports = store;
