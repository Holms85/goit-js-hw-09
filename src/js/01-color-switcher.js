const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
buttonStart.addEventListener('click', onStartBtn);
buttonStop.addEventListener('click', onStopBtn);
let timerId;
function onStartBtn() {
  buttonStop.removeAttribute('disabled');
  buttonStart.setAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStopBtn() {
  buttonStop.setAttribute('disabled', 'disabled');
  buttonStart.removeAttribute('disabled');
  clearInterval(timerId);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
