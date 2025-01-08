const initialModeText = document.getElementById('mode-text').textContent;
let timeLeft;
let workTime = 20 * 60; // 20 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds
let isWorkTime = true;
let timerId = null;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');

startButton.classList.add('green');
pauseButton.classList.add('red');
resetButton.classList.add('blue');

function updateDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update the display elements
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    
    // Update the browser tab title
    document.title = `${timeString} - ${isWorkTime ? 'Work' : 'Break'}`;
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workTime : breakTime;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay(timeLeft);
}

function startTimer() {
    if (timerId !== null) return;
    
    if (!timeLeft) {
        timeLeft = isWorkTime ? workTime : breakTime;
    }

    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            switchMode();
            alert(isWorkTime ? 'Break time is over! Time to work!' : 'Work time is over! Take a break!');
            startTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = workTime;
    modeText.textContent = 'the only rule is work';
    updateDisplay(timeLeft);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

timeLeft = workTime;
updateDisplay(timeLeft);