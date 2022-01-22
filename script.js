//Warning, this project is in a very early state
//Modified version of : https://www.geeksforgeeks.org/create-a-music-player-using-javascript/



let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;

let isPlaying = false;
let updateTimer;

let currAlbum;
let albLength;

let curr_track = document.createElement('audio');

function albumSetter(album){
  console.log("set album")
  currAlbum = album;

  loadTrack(0)
}

function loadTrack(track_index) {
  console.log("load track")
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = currAlbum[track_index].path;
  curr_track.load();
  playTrack();

  track_art.style.backgroundImage = "url(" + currAlbum[track_index].image + ")";
  track_name.textContent = currAlbum[track_index].name;
  track_artist.textContent = currAlbum[track_index].artist;
  now_playing.textContent = (track_index + 1) + " OF " + currAlbum.length;
  updateTimer = setInterval(seekUpdate, 1000);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fas fa-play"></i>';;
}

function nextTrack(){
  console.log("next track")
  
  if (track_index < currAlbum.length - 1)
  track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  
}

function prevTrack() {
  console.log("prev track")
  if(track_index === 0){
    return
  }
  if (track_index > 0)
    track_index -= 1;
  else track_index = currAlbum.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;

    if (currentMinutes === durationMinutes && currentSeconds === durationSeconds){
      console.log("ended")
      nextTrack();
    }
  }
}