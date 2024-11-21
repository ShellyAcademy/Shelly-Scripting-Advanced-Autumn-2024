// lookup an item and use it
let counter = Script.storage.getItem('counter');
if (typeof counter !== 'string') {
  console.log('first time!');
  counter = 1;
} else {
  counter = Number(counter) + 1;
}
// Storage only supports string values
Script.storage.setItem('counter', String(counter));
console.log('script was started', counter, 'times');