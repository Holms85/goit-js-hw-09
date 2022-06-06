import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const button = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

button.addEventListener('click', onStartBtn);
button.setAttribute('disabled', 'disabled');

let currentDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDate = selectedDates[0];
    if (currentDate < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      button.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

function onStartBtn() {
  button.setAttribute('disabled', true);
  const timerId = setInterval(() => {
    const delta = currentDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(delta);
    timerDays.textContent = days;
    timerHours.textContent = hours;
    timerMinutes.textContent = minutes;
    timerSeconds.textContent = seconds;
    if (delta < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function normaliseTimeString(value) {
  return String(value).padStart(2, '0');
}

console.log(currentDate);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = normaliseTimeString(Math.floor(ms / day));
  // Remaining hours
  const hours = normaliseTimeString(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = normaliseTimeString(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = normaliseTimeString(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
};