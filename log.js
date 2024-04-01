function createLogger() {
  const logger = document.createElement("div");
  logger.id = "logger";
  logger.style.position = 'fixed';
  logger.style.bottom = '0';
  logger.style.height = '25%';
  document.body.appendChild(logger);
}

function logUnderFingerElement(event) {
  const logger = document.getElementById("logger");
  if (!logger) {
    createLogger();
    logUnderFingerElement(event);
  } else {
    logger.innerHTML += `${event.type}<br>
    ${event.target}<br>
    ${console.log('---')}<br>`;
  }
}

document.addEventListener('mousemove', logUnderFingerElement);
document.addEventListener('pointermove', logUnderFingerElement);
