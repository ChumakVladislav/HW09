const ref = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let randomInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

ref.startBtn.addEventListener('click', startRandom);

function startRandom() {
  randomInterval = setInterval(() => {
    ref.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  ref.startBtn.disabled = true;

  console.log(randomInterval);
}

ref.stopBtn.addEventListener('click', stopBtn);

function stopBtn() {
  clearInterval(randomInterval);
  ref.startBtn.disabled = false;
}
