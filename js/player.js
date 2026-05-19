// songs 배열에서 제목, 아티스트, 파일 경로, 커버 이미지를 관리합니다.
const songs = [
  {
    title: '난 아니에요',
    artist: '검정치마',
    file: './music/01 트랙 1.flac',
    cover: './covers/team-baby.webp'
  },
  {
    title: 'Big Love',
    artist: '검정치마',
    file: './music/02 트랙 2.flac',
    cover: './covers/team-baby.webp'
  },
  {
    title: 'Diamond',
    artist: '검정치마',
    file: './music/03 트랙 3.flac',
    cover: './covers/team-baby.webp'
  },
  {
    title: 'Love is All',
    artist: '검정치마',
    file: './music/04 트랙 4.flac',
    cover: './covers/team-baby.webp'
  },
  {
    title: '내 고향 서울엔',
    artist: '검정치마',
    file: './music/05 트랙 5.flac',
    cover: './covers/team-baby.webp'
  },
  {
    title: '폭죽과 풍선들',
    artist: '검정치마',
    file: './music/06 트랙 6.flac',
    cover: './covers/team-baby.webp'
  },
  {
    title: '한시 오분 (1:05)',
    artist: '검정치마',
    file: './music/07 트랙 7.flac',
    cover: './covers/team-baby.webp'
  },
  {
    title: '나랑 아니면',
    artist: '검정치마',
    file: './music/08 트랙 8.flac',
    cover: './covers/team-baby.webp'
  },
  {
    title: '혜야',
    artist: '검정치마',
    file: './music/09 트랙 9.flac',
    cover: './covers/team-baby.webp'
  },
  {
    title: 'EVERYTHING',
    artist: '검정치마',
    file: './music/EVERYTHING.flac',
    cover: './covers/team-baby.webp'
  },
  {
    title: '걱정하지마',
    artist: '검정치마',
    file: './music/걱정하지마.flac',
    cover: './covers/team-baby.webp'
  }
];

const audio = new Audio();
const coverArt = document.getElementById('cover-art');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playButton = document.getElementById('play-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const repeatButton = document.getElementById('repeat-button');
const progressBar = document.getElementById('progress-bar');
const currentTimeText = document.getElementById('current-time');
const durationText = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const playlist = document.getElementById('playlist');
const songCount = document.getElementById('song-count');

let currentIndex = 0;
let isSeeking = false;
let repeatMode = 'off';

const repeatLabels = {
  off: '반복 끔',
  all: '전체 반복',
  one: '한 곡 반복'
};

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

function updateCover(song) {
  coverArt.classList.toggle('has-cover', Boolean(song.cover));
  coverArt.style.backgroundImage = song.cover
    ? `url("${song.cover}")`
    : '';
}

function updatePlaylistActiveState() {
  document.querySelectorAll('.playlist-item').forEach((item, index) => {
    item.classList.toggle('active', index === currentIndex);
  });
}

function loadSong(index, shouldPlay = false) {
  currentIndex = (index + songs.length) % songs.length;
  const song = songs[currentIndex];

  audio.src = song.file;
  trackTitle.textContent = song.title;
  trackArtist.textContent = song.artist;
  progressBar.value = 0;
  currentTimeText.textContent = '0:00';
  durationText.textContent = '0:00';
  updateCover(song);
  updatePlaylistActiveState();

  if (shouldPlay) {
    audio.play();
  }
}

function playSong() {
  audio.play();
}

function pauseSong() {
  audio.pause();
}

function togglePlay() {
  if (audio.paused) {
    playSong();
    return;
  }

  pauseSong();
}

function playPreviousSong() {
  loadSong(currentIndex - 1, true);
}

function playNextSong() {
  loadSong(currentIndex + 1, true);
}

function updateRepeatButton() {
  repeatButton.textContent = repeatLabels[repeatMode];
  repeatButton.classList.toggle('active', repeatMode !== 'off');
  repeatButton.setAttribute('aria-label', `반복 모드: ${repeatLabels[repeatMode]}`);
}

function changeRepeatMode() {
  if (repeatMode === 'off') {
    repeatMode = 'all';
  } else if (repeatMode === 'all') {
    repeatMode = 'one';
  } else {
    repeatMode = 'off';
  }

  updateRepeatButton();
}

function handleSongEnded() {
  if (repeatMode === 'one') {
    audio.currentTime = 0;
    playSong();
    return;
  }

  if (currentIndex < songs.length - 1) {
    playNextSong();
    return;
  }

  if (repeatMode === 'all') {
    loadSong(0, true);
    return;
  }

  playButton.textContent = '▶';
  playButton.setAttribute('aria-label', '재생');
}

function updateProgress() {
  if (isSeeking || !audio.duration) {
    return;
  }

  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeText.textContent = formatTime(audio.currentTime);
}

function seekToProgress() {
  if (!audio.duration) {
    return;
  }

  audio.currentTime = (progressBar.value / 100) * audio.duration;
  currentTimeText.textContent = formatTime(audio.currentTime);
}

function renderPlaylist() {
  if (songs.length === 0) {
    playlist.innerHTML = '<p class="empty-message">songs 배열에 노래를 추가해 주세요.</p>';
    songCount.textContent = '0 songs';
    return;
  }

  songCount.textContent = `${songs.length} songs`;

  songs.forEach((song, index) => {
    const item = document.createElement('button');
    item.className = 'playlist-item';
    item.type = 'button';

    item.innerHTML = `
      <span class="track-number">${index + 1}</span>
      <span>
        <span class="playlist-title">${song.title}</span>
        <span class="playlist-artist">${song.artist}</span>
      </span>
      <span class="track-length">--:--</span>
    `;

    item.addEventListener('click', () => {
      loadSong(index, true);
    });

    playlist.appendChild(item);
  });
}

playButton.addEventListener('click', togglePlay);
prevButton.addEventListener('click', playPreviousSong);
nextButton.addEventListener('click', playNextSong);
repeatButton.addEventListener('click', changeRepeatMode);

audio.addEventListener('play', () => {
  playButton.textContent = '⏸';
  playButton.setAttribute('aria-label', '일시정지');
});

audio.addEventListener('pause', () => {
  playButton.textContent = '▶';
  playButton.setAttribute('aria-label', '재생');
});

audio.addEventListener('loadedmetadata', () => {
  durationText.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', handleSongEnded);

progressBar.addEventListener('input', () => {
  isSeeking = true;
});

progressBar.addEventListener('change', () => {
  seekToProgress();
  isSeeking = false;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

audio.volume = volumeSlider.value;
updateRepeatButton();
renderPlaylist();
loadSong(0);
