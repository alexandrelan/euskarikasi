function createLogger() {
  const logger = document.createElement("div");
  logger.style.position = 'fixed';
  logger.style.bottom = '0';
  logger.height = '25%';
  document.body.appendChild(logger);
}

function logUnderFingerElement(event) {
  const logger = document.getElementById("logger");
  if (!logger) {
    createLogger();
    logUnderFingerElement(event);
  } else {
    console.log( event.type)
    console.log(event.target);
    console.log('---');
  }
}

document.addEventListener('mousemove', logUnderFingerElement);
document.addEventListener('pointermove', logUnderFingerElement);
