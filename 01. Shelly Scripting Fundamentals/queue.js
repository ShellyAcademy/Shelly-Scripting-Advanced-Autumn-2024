queue = []

function enqueue(value) {
  queue.push(value)
}

function dequeue() {
  if (queue.length===0){
    return "Queue is empty"
  }
  return queue.splice(0,1)[0]
}

function isEmpty() {
  return queue.length === 0;
}

enqueue(1);
enqueue(2);
enqueue(3);
enqueue(4);

console.log(queue);
console.log(dequeue());
console.log(dequeue());
console.log(dequeue());
console.log(dequeue());
console.log(dequeue());