// DOM Elements
const video = document.querySelector('.player__video');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volumeSlider = document.querySelector('input[name="volume"]');
const speedSlider = document.querySelector('input[name="playbackSpeed"]');
const skipButtons = document.querySelectorAll('[data-skip]');

// Toggle Play/Pause
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

// Update Play/Pause Button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Handle Volume Change
function handleVolumeUpdate() {
  video.volume = parseFloat(volumeSlider.value);
}

// Handle Playback Speed Change
function handleSpeedUpdate() {
  video.playbackRate = parseFloat(speedSlider.value);
}

// Skip Video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Scrub Through Video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

volumeSlider.addEventListener('input', handleVolumeUpdate);
speedSlider.addEventListener('input', handleSpeedUpdate);

skipButtons.forEach(button => button.addEventListener('click', skip));
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => e.buttons === 1 && scrub(e));
