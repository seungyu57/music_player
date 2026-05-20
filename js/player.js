// albums 배열에서 앨범과 곡 정보를 관리합니다.
const albums = [
  {
    title: 'TEAM BABY',
    artist: '검정치마',
    cover: './covers/team-baby.webp',
    songs: [
      { title: '난 아니에요', file: './music/01 트랙 1.flac' },
      { title: 'Big Love', file: './music/02 트랙 2.flac' },
      { title: 'Diamond', file: './music/03 트랙 3.flac' },
      { title: 'Love is All', file: './music/04 트랙 4.flac' },
      { title: '내 고향 서울엔', file: './music/05 트랙 5.flac' },
      { title: '폭죽과 풍선들', file: './music/06 트랙 6.flac' },
      { title: '한시 오분 (1:05)', file: './music/07 트랙 7.flac' },
      { title: '나랑 아니면', file: './music/08 트랙 8.flac' },
      { title: '혜야', file: './music/09 트랙 9.flac' },
      { title: 'EVERYTHING', file: './music/EVERYTHING.flac' },
      { title: '걱정하지마', file: './music/걱정하지마.flac' }
    ]
  },
  {
    title: "My Feet Don't Touch The Ground",
    artist: '검정치마',
    cover: './covers/blackskirt.webp',
    songs: [
      { title: 'Moon River', file: './music/my-feet-dont-touch-the-ground/01 트랙 1.flac' },
      { title: 'I Like Watching You Go', file: './music/my-feet-dont-touch-the-ground/02 트랙 2.flac' },
      { title: 'Mexican Boy', file: './music/my-feet-dont-touch-the-ground/03 트랙 3.flac' },
      { title: 'Heard In a Dream', file: './music/my-feet-dont-touch-the-ground/04 트랙 4.flac' },
      { title: 'Mesmerized', file: './music/my-feet-dont-touch-the-ground/05 트랙 5.flac' },
      { title: 'Back to the sea', file: './music/my-feet-dont-touch-the-ground/06 트랙 6.flac' },
      { title: 'Destroyed by Love', file: './music/my-feet-dont-touch-the-ground/07 트랙 7.flac' },
      { title: "The Devil Bought My Soul (and I don't need a band)", file: './music/my-feet-dont-touch-the-ground/08 트랙 8.flac' },
      { title: 'Call Me If You Are 15', file: './music/my-feet-dont-touch-the-ground/09 트랙 9.flac' },
      { title: 'Lara Starbucks', file: './music/my-feet-dont-touch-the-ground/10 트랙 10.flac' },
      { title: 'Sour', file: './music/my-feet-dont-touch-the-ground/11 트랙 11.flac' },
      { title: '대관령', file: './music/my-feet-dont-touch-the-ground/12 트랙 12.flac' },
      { title: 'Me and Whiskey and Lil Wayne', file: './music/my-feet-dont-touch-the-ground/13 트랙 13.flac' },
      { title: 'Sundried', file: './music/my-feet-dont-touch-the-ground/14 트랙 14.flac' },
      { title: 'Lizzy', file: './music/my-feet-dont-touch-the-ground/15 트랙 15.flac' },
      { title: '남', file: './music/my-feet-dont-touch-the-ground/16 트랙 16.flac' },
      { title: 'Alaskan Love Song', file: './music/my-feet-dont-touch-the-ground/17 트랙 17.flac' },
      { title: '진달래', file: './music/my-feet-dont-touch-the-ground/18 트랙 18.flac' },
      { title: 'Monday Morning Walk to Work', file: './music/my-feet-dont-touch-the-ground/19 트랙 19.flac' },
      { title: 'Back In 1999', file: './music/my-feet-dont-touch-the-ground/20 트랙 20.flac' }
    ]
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
const albumList = document.getElementById('album-list');
const playlist = document.getElementById('playlist');
const songCount = document.getElementById('song-count');

let currentAlbumIndex = 0;
let currentIndex = 0;
let isSeeking = false;
let repeatMode = 'off';

const repeatLabels = {
  off: '반복 끔',
  all: '전체 반복',
  one: '한 곡 반복'
};

function getCurrentAlbum() {
  return albums[currentAlbumIndex];
}

function getCurrentSongs() {
  return getCurrentAlbum().songs;
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

function updateCover(album) {
  coverArt.classList.toggle('has-cover', Boolean(album.cover));
  coverArt.style.backgroundImage = album.cover
    ? `url("${album.cover}")`
    : '';
}

function updateAlbumActiveState() {
  document.querySelectorAll('.album-button').forEach((item, index) => {
    item.classList.toggle('active', index === currentAlbumIndex);
  });
}

function updatePlaylistActiveState() {
  document.querySelectorAll('.playlist-item').forEach((item, index) => {
    item.classList.toggle('active', index === currentIndex);
  });
}

function loadSong(index, shouldPlay = false) {
  const album = getCurrentAlbum();
  const songs = getCurrentSongs();

  currentIndex = (index + songs.length) % songs.length;
  const song = songs[currentIndex];

  audio.src = song.file;
  trackTitle.textContent = song.title;
  trackArtist.textContent = album.artist;
  progressBar.value = 0;
  currentTimeText.textContent = '0:00';
  durationText.textContent = '0:00';
  updateCover(album);
  updateAlbumActiveState();
  updatePlaylistActiveState();

  if (shouldPlay) {
    audio.play();
  }
}

function setAlbum(index, shouldPlay = true) {
  currentAlbumIndex = index;
  currentIndex = 0;
  pauseSong();
  renderPlaylist();
  loadSong(0, shouldPlay);
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
  const songs = getCurrentSongs();

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

function renderAlbums() {
  albumList.innerHTML = '';

  albums.forEach((album, index) => {
    const item = document.createElement('button');
    item.className = 'album-button';
    item.type = 'button';

    item.innerHTML = `
      <span class="album-thumb" style="background-image: url('${album.cover}')"></span>
      <span>
        <span class="album-name">${album.title}</span>
        <span class="album-meta">${album.artist} · ${album.songs.length} songs</span>
      </span>
    `;

    item.addEventListener('click', () => {
      setAlbum(index);
    });

    albumList.appendChild(item);
  });

  updateAlbumActiveState();
}

function renderPlaylist() {
  const album = getCurrentAlbum();
  const songs = getCurrentSongs();

  playlist.innerHTML = '';

  if (songs.length === 0) {
    playlist.innerHTML = '<p class="empty-message">앨범에 노래를 추가해 주세요.</p>';
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
        <span class="playlist-artist">${album.artist}</span>
      </span>
      <span class="track-length">--:--</span>
    `;

    item.addEventListener('click', () => {
      loadSong(index, true);
    });

    playlist.appendChild(item);
  });

  updatePlaylistActiveState();
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
renderAlbums();
renderPlaylist();
loadSong(0);
