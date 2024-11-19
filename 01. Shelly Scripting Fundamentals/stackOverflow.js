counter = 0
function stack_overflow() {
  counter++;
  console.log(counter);
  if (counter>11)
    return;
  stack_overflow();
}

stack_overflow()