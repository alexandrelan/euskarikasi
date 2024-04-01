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
    const tag = event.target.tag;
    const text = event.target.innerText;
    const classList = event.target.classList;
    logger.innerHTML = `${event.type} : ${tag}/${classList}/${text}<br>${logger.innerHTML}`;
  }
}

document.addEventListener('mousemove', logUnderFingerElement);
document.addEventListener('pointermove', logUnderFingerElement);
