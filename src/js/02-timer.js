// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

//Налаштування календаря
const ref = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

ref.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  lastTime: 0,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    ref.startBtn.disabled = false;
    options.defaultDate = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

ref.startBtn.addEventListener('click', timerStart);

function timerStart() {
  const id = setInterval(() => {
    if (options.defaultDate - Date.now() < 1000) {
      clearInterval(id);
    }
    const timeLess = options.defaultDate - Date.now();
    const timerData = convertMs(timeLess);

    ref.days.textContent = timerData.days.toString().padStart(2, '0');
    ref.hours.textContent = timerData.hours.toString().padStart(2, '0');
    ref.minutes.textContent = timerData.minutes.toString().padStart(2, '0');
    ref.seconds.textContent = timerData.seconds.toString().padStart(2, '0');
  }, 1000);
}
