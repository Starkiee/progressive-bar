document.addEventListener('DOMContentLoaded', function () {
  const progressContainer = document.getElementById('progress-container');
  const addButton = document.getElementById('addButton');
  const pauseResumeButton = document.getElementById('pauseResumeButton');
  let progressBarList = [];
  let loading = false;
  let isPaused = false;

  addButton.addEventListener('click', () => {
    addProgressBar();
    if (!loading) {
      loadProgressBar();
    }
  });

  pauseResumeButton.addEventListener('click', () => {
    togglePauseResume();
  });

  function addProgressBar() {
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBarContainer.appendChild(progressBar);
    progressContainer.appendChild(progressBarContainer);
  }

  function loadProgressBar() {
    const progressBarContainers = progressContainer.getElementsByClassName('progress-bar-container');
    if (progressBarList.length < progressBarContainers.length) {
      const progressBarContainer = progressBarContainers[progressBarList.length];
      const progressBar = progressBarContainer.querySelector('.progress-bar');
      loading = true;

      progressBar.style.animation = 'none';
      void progressBar.offsetWidth;
      progressBar.style.animation = 'progressAnimation 3s linear forwards';

      progressBar.addEventListener('animationend', () => {
        progressBarList.push(progressBarContainer);
        loading = false;
        loadProgressBar();
      });
    }
  }

  function togglePauseResume() {
    isPaused = !isPaused;
    const pauseResumeButtonText = isPaused ? 'Resume' : 'Pause';
    pauseResumeButton.textContent = pauseResumeButtonText;

    const progressBarContainers = progressContainer.getElementsByClassName('progress-bar-container');
    for (const progressBarContainer of progressBarContainers) {
      const progressBar = progressBarContainer.querySelector('.progress-bar');
      if (isPaused) {
        progressBar.style.animationPlayState = 'paused';
      } else {
        progressBar.style.animationPlayState = 'running';
      }
    }
  }
});
