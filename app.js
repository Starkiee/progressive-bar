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

      requestAnimationFrame(() => {
        progressBarContainer.querySelector('.progress-bar').style.width = '100%';
      });

      setTimeout(() => {
        progressBarQueue.push(progressBarContainer);
        loading = false;
        loadProgressBar();
      }, 3000);
    }
  }
});
