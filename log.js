logUnderFingerElement(event) {
console.log(event.type)
  console.log(event.target);
  console.log(event.currentTarget);
  console.log('---');
}

document.addEventListener('mousemove', logUnderFingerElement);
document.addEventListener('pointermove', logUnderFingerElement);
