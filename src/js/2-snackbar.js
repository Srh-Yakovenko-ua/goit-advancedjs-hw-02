import iziToast from "izitoast";


const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateInputs = form.querySelectorAll('input[name="state"]');


const TOAST_SETTINGS = {
  position: 'topRight',
  timeout: 5000,
  close: false,
  displayMode: 1
};
const getSelectedState = () =>  Array.from(stateInputs).find(input => input.checked)?.value;
const isInvalidDelay = (delay) => isNaN(delay) || delay < 0;


const showSuccessToast = (message) => {
    iziToast.success({
      ...TOAST_SETTINGS,
      message,
      backgroundColor: '#4CAF50'
    });
  };
  
  const showErrorToast = (message) => {
    iziToast.error({
      ...TOAST_SETTINGS,
      message,
      backgroundColor: '#EF5350'
    });
  };


const handleFormSubmit = (event) => {
  event.preventDefault();
  
  const delay = parseInt(delayInput.value);
  const state = getSelectedState();

  if (isInvalidDelay(delay)) {
    showErrorToast('Invalid delay value');
    return;
  }

  processPromise(delay, state);
  form.reset();
};


const processPromise = (delay, state) => {
  createPromise(delay, state)
    .then(() => showSuccessToast(`✅ Fulfilled promise in ${delay}ms`))
    .catch(() => showErrorToast(`❌ Rejected promise in ${delay}ms`));
};

const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });
};

form.addEventListener('submit', handleFormSubmit);
