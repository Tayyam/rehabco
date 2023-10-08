document.addEventListener('DOMContentLoaded', (event) => {
  const videoSections = document.querySelectorAll('.videoSection');

  videoSections.forEach((section, index) => {
    const video = section.querySelector('video');
    const playBtn = section.querySelector('.btn[id="play"]');
    const stopBtn = section.querySelector('.btn[id="stop"]');
    const progressBar = section.querySelector('.peogressbar');
    const timestamp = section.querySelector('.timestamp');

    function toggleVideoStatus() {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }

    function updatePlayIcon() {
      if (video.paused) {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      } else {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      }
    }

    function stopVideo() {
      video.currentTime = 0;
      video.pause();
    }

    function updateProgressBar() {
      progressBar.value = (video.currentTime * 100) / video.duration;
      let min = Math.floor(video.currentTime / 60);
      let sec = Math.floor(video.currentTime - min * 60);
      if (min < 10) { min = '0' + String(min); }
      if (sec < 10) { sec = '0' + String(sec); }
      timestamp.innerText = `${min}:${sec}`;
    }

    function dragProgressBar() {
      video.currentTime = (+progressBar.value * video.duration) / 100;
    }

    playBtn.addEventListener('click', toggleVideoStatus);
    video.addEventListener('click', toggleVideoStatus);
    video.addEventListener('pause', updatePlayIcon);
    video.addEventListener('play', updatePlayIcon);
    stopBtn.addEventListener('click', stopVideo);
    video.addEventListener('timeupdate', updateProgressBar);
    progressBar.addEventListener('change', dragProgressBar);
  });
});
