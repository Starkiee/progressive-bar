document.addEventListener('DOMContentLoaded', function () {
  const progressContainer = document.getElementById('progress-container');
  const startButton = document.getElementById('startButton');
  let progressBarQueue = [];
  let loading = false;

  startButton.addEventListener('click', () => {
    createProgressBar();
    if (!loading) {
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
      loading = true;

      // Start the loading animation
      requestAnimationFrame(() => {
        progressBarContainer.querySelector('.progress-bar').style.width = '100%';
      });

      // After 3 seconds, set loading to false to allow the next bar to load
      setTimeout(() => {
        progressBarQueue.push(progressBarContainer);
        loading = false;
        loadProgressBar();
      }, 3000);
    }
  }
});
