// Import library
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Get form element
const formRef = document.querySelector('.form');

// Set event listener submit on form
formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  let step = Number(formRef.delay.value);

  for (let i = 1; i <= formRef.amount.value; i++) {
    createPromise(i, step);
    step += Number(formRef.step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
