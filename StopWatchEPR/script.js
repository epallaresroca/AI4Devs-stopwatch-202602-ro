// ====== MODE SWITCH ======
const showStopwatchBtn = document.getElementById("showStopwatch");
const showCountdownBtn = document.getElementById("showCountdown");
const stopwatchSection = document.getElementById("stopwatchSection");
const countdownSection = document.getElementById("countdownSection");

showStopwatchBtn.addEventListener("click", () => {
  showStopwatchBtn.classList.add("active");
  showCountdownBtn.classList.remove("active");
  stopwatchSection.classList.add("active");
  countdownSection.classList.remove("active");
});

showCountdownBtn.addEventListener("click", () => {
  showCountdownBtn.classList.add("active");
  showStopwatchBtn.classList.remove("active");
  countdownSection.classList.add("active");
  stopwatchSection.classList.remove("active");
});

// ====== STOPWATCH ======
const stopwatchDisplay = document.getElementById("stopwatchDisplay");
const startStopwatchBtn = document.getElementById("startStopwatch");
const pauseStopwatchBtn = document.getElementById("pauseStopwatch");
const resetStopwatchBtn = document.getElementById("resetStopwatch");

let stopwatchInterval = null;
let stopwatchSeconds = 0;

function formatStopwatchTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0")
  );
}

function updateStopwatchDisplay() {
  stopwatchDisplay.textContent = formatStopwatchTime(stopwatchSeconds);
}

startStopwatchBtn.addEventListener("click", () => {
  if (stopwatchInterval !== null) return;

  stopwatchInterval = setInterval(() => {
    stopwatchSeconds++;
    updateStopwatchDisplay();
  }, 1000);
});

pauseStopwatchBtn.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

resetStopwatchBtn.addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchSeconds = 0;
  updateStopwatchDisplay();
});

// ====== COUNTDOWN ======
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const countdownDisplay = document.getElementById("countdownDisplay");
const startCountdownBtn = document.getElementById("startCountdown");
const pauseCountdownBtn = document.getElementById("pauseCountdown");
const resetCountdownBtn = document.getElementById("resetCountdown");
const countdownMessage = document.getElementById("countdownMessage");

let countdownInterval = null;
let countdownTotalSeconds = 60;
let countdownInitialSeconds = 60;

function formatCountdownTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0")
  );
}

function updateCountdownDisplay() {
  countdownDisplay.textContent = formatCountdownTime(countdownTotalSeconds);
}

function readCountdownInputs() {
  const minutes = Math.max(0, parseInt(minutesInput.value, 10) || 0);
  const seconds = Math.min(59, Math.max(0, parseInt(secondsInput.value, 10) || 0));
  return minutes * 60 + seconds;
}

function syncCountdownFromInputs() {
  countdownInitialSeconds = readCountdownInputs();
  countdownTotalSeconds = countdownInitialSeconds;
  updateCountdownDisplay();
}

minutesInput.addEventListener("input", syncCountdownFromInputs);
secondsInput.addEventListener("input", syncCountdownFromInputs);

startCountdownBtn.addEventListener("click", () => {
  if (countdownInterval !== null) return;

  if (countdownTotalSeconds <= 0) {
    countdownMessage.textContent = "Introduce un tiempo mayor que 0.";
    return;
  }

  countdownMessage.textContent = "";

  countdownInterval = setInterval(() => {
    countdownTotalSeconds--;
    updateCountdownDisplay();

    if (countdownTotalSeconds <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      countdownTotalSeconds = 0;
      updateCountdownDisplay();
      countdownMessage.textContent = "⏰ ¡Tiempo terminado!";
    }
  }, 1000);
});

pauseCountdownBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
});

resetCountdownBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
  countdownMessage.textContent = "";
  syncCountdownFromInputs();
});

// Initial paint
updateStopwatchDisplay();
syncCountdownFromInputs();
