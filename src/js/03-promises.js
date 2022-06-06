import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');

form.addEventListener('submit', submitForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promice = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promice;
}

function submitForm(e) {
  e.preventDefault();
  let delay = Number(inputStep.value);
  for (let i = 0; i < inputAmount.value; i += 1) {
      const position = i + 1;
      delay = +inputDelay.value + +inputStep.value * i;
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.failure(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  
};
