document.addEventListener('DOMContentLoaded', function () {
  const progressContainer = document.getElementById('progress-container');
  const startButton = document.getElementById('startButton');
  const pauseButton = document.getElementById('pauseButton');
  let progressBarQueue = [];
  let loading = false;
  let paused = false;
  let animationFrameId = null; // Track the animation frame
  let startTimestamps = []; // Track start timestamps for each bar

  startButton.addEventListener('click', () => {
    createProgressBar();
    if (!loading) {
      loadProgressBar();
    }
  });

  pauseButton.addEventListener('click', () => {
    paused = !paused;
    if (paused) {
      cancelAnimationFrame(animationFrameId);
      pauseButton.textContent = 'Resume';
    } else {
      pauseButton.textContent = 'Pause';
      loadProgressBar();
    }
  });

  function createProgressBar() {
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBarContainer.appendChild(progressBar);
    progressContainer.appendChild(progressBarContainer);
  }

  function loadProgressBar() {
    const progressBarContainers = progressContainer.getElementsByClassName('progress-bar-container');
    if (progressBarQueue.length < progressBarContainers.length) {
      const progressBarContainer = progressBarContainers[progressBarQueue.length];
      const progressBar = progressBarContainer.querySelector('.progress-bar');
      loading = true;
      const currentIndex = progressBarQueue.length;

      function step(timestamp) {
        if (paused) {
          cancelAnimationFrame(animationFrameId);
          loading = false;
          return;
        }

        if (startTimestamps[currentIndex] === undefined) {
          startTimestamps[currentIndex] = timestamp;
        }

        const progress = (timestamp - startTimestamps[currentIndex]) / 3000;
        progressBar.style.width = Math.min(progress * 100, 100) + '%';

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          progressBarQueue.push(progressBarContainer);
          loading = false;
          loadProgressBar();
        }
      }

      requestAnimationFrame(step);
    }
  }
});
