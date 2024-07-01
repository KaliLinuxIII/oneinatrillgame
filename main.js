const btn = document.querySelector('.btn');
const display = document.getElementById('display');
const container = document.querySelector('.container');
const clickDisplay = document.getElementById('button-click-counter');
const timeDisplay = document.getElementById('time-display');
const numsOffDisplay = document.getElementById('nums-off-display');
let clicks = 0;
let elapsedTime = localStorage.getItem('elapsedTime') || 0;
const randomNumber = () => {
  return Math.floor(Math.random() * 1000000000000 + 1);
};

const targetNumber = randomNumber();

function renderRandomNumber() {
  btn.disabled = true;
  btn.style.cursor = 'not-allowed';
  btn.textContent = 'Not Ready';
  clicks ++;
  clickDisplay.innerHTML = `Times button has been clicked: ${clicks}`;
  const result = randomNumber();
  console.log(result);
  const randomIndex = Math.floor(Math.random() * insultingMsgs.length);
  display.innerHTML = insultingMsgs[randomIndex];
  let numsOff = Math.abs(result - targetNumber);
  console.log(numsOff);
  numsOffDisplay.textContent = `Numbers off: ${numsOff}`;
  
  if (result === targetNumber) {
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';
    display.innerHTML = 'Congratulations!, you got the one in a trillion!';
    container.style.backgroundColor = 'green';
  } else {
    setTimeout(() => {
      btn.disabled = false;
      btn.style.cursor = 'pointer';
      btn.textContent = 'Click Me';
    }, 1000);
  };
};

function updateTime() {
  const hours = Math.floor(elapsedTime /3600000).toString().padStart(2, '0');
  const minutes = Math.floor((elapsedTime % 3600000) / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0');
  timeDisplay.innerHTML = `Time you've spent here: ${hours}:${minutes}:${seconds}`;
};

function startTimer() {
  const initalTime = Date.now() - elapsedTime;
  setInterval(() => {
    elapsedTime = Date.now() - initalTime;
    localStorage.setItem('elapsedTime', elapsedTime);
    updateTime();
  }, 1000);
};

const insultingMsgs = [
  'Not a chance',
  'Nope',
  'Try again',
  'Still here?',
  'You must have nothing better to do?',
  'Click click clickedy click',
  'Just give up',
  "I'm sure you don't have all day",
  'I wish I could watch this right now',
  '"Something negative"',
  '"Something contraversal"',
  '"Something Incriminating"',
  'A trillion is a pretty high number, just saying'
];

btn.addEventListener('click', renderRandomNumber);
window.onload = startTimer();

window.onbeforeunload = () => {
  localStorage.setItem('elapsedTime', elapsedTime);
};