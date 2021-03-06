const EventEmitter = require('events');
const store = new EventEmitter();

let grudges = [];

const storedGrudges = localStorage.getItem('grudges');
if (storedGrudges) {grudges = JSON.parse(storedGrudges); }

store.all = () => grudges.concat([]);

store.createGrudge = (newGrudge) => {
  grudges = grudges.concat(newGrudge);
  store.emit('change', grudges);
};

store.destroy = (id) => {
  grudges = grudges.filter(grudge => grudge.id !== id);
  store.emit('change', grudges);
}

const assignForgiveStatus = (targetGrudge) => {
  if (targetGrudge.forgivenStatus === 'Forgive') {
    grudges = grudges.map(grudge => Object.assign(grudge, { forgivenStatus: 'Unforgive' }) );
  } else {
    grudges = grudges.map(grudge => Object.assign(grudge, { forgivenStatus: 'Forgive' }) );
  }
}

store.forgive = (id) => {
  let targetGrudge = grudges.filter(grudge => grudge.id)[0];
  assignForgiveStatus(targetGrudge)
  store.emit('change', grudges);
}

store.on('change', () => {
  localStorage.setItem('grudges', JSON.stringify(grudges));
});


module.exports = store;
