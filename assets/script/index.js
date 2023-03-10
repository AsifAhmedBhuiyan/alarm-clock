'use strict';

const alarmSound = new Audio('./assets/audio/alarm.mp3');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmButton = document.getElementById('set-alarm-btn');
const alarmStatus = document.getElementById('alarm-status');
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

let alarmTime = null;
let alarmIntervalId = null;

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

function startAlarm() {
  alarmStatus.textContent = 'Alarm set for ' + alarmTime;
  setAlarmButton.disabled = true;
  alarmIntervalId = setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = hours + ':' + minutes;
    if (alarmTime === currentTime) {
      alarmSound.play();
      clearInterval(alarmIntervalId);
      alarmStatus.textContent = 'Alarm ringing!';
      setAlarmButton.disabled = false;
      setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmStatus.textContent = '';
      }, 60000);
    }
  }, 1000);
}

function setAlarm() {
  const regExp = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (regExp.test(alarmTimeInput.value)) {
    alarmTime = alarmTimeInput.value;
    startAlarm();
  } else {
    alarmStatus.innerText = 'Invalid input. Please enter a time in hh:mm format.';
  }
}

setInterval(updateClock, 1000);
setAlarmButton.addEventListener('click', setAlarm);