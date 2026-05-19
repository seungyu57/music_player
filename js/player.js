// 노래를 추가하거나 수정하려면 아래 배열의 title과 file을 바꾸면 됩니다.
// file 경로는 ./music/파일명.flac 또는 ./music/파일명.mp3 형태를 사용합니다.
const songs = [
  {
    title: '트랙 1',
    file: './music/01 트랙 1.flac'
  },
  {
    title: '트랙 2',
    file: './music/02 트랙 2.flac'
  },
  {
    title: '트랙 3',
    file: './music/03 트랙 3.flac'
  },
  {
    title: '트랙 4',
    file: './music/04 트랙 4.flac'
  },
  {
    title: '트랙 5',
    file: './music/05 트랙 5.flac'
  },
  {
    title: '트랙 6',
    file: './music/06 트랙 6.flac'
  },
  {
    title: '트랙 7',
    file: './music/07 트랙 7.flac'
  },
  {
    title: '트랙 8',
    file: './music/08 트랙 8.flac'
  },
  {
    title: '트랙 9',
    file: './music/09 트랙 9.flac'
  },
  {
    title: '트랙 10',
    file: './music/10 트랙 10.flac'
  }
];

const songList = document.getElementById('song-list');
const currentSong = document.getElementById('current-song');
const audioPlayers = [];

function stopOtherSongs(currentAudio) {
  audioPlayers.forEach((audio) => {
    if (audio !== currentAudio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

function renderSongs() {
  if (songs.length === 0) {
    songList.innerHTML = '<p class="empty-message">songs 배열에 노래를 추가해 주세요.</p>';
    return;
  }

  songs.forEach((song) => {
    const songItem = document.createElement('article');
    songItem.className = 'song-item';

    const title = document.createElement('p');
    title.className = 'song-title';
    title.textContent = song.title;

    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = song.file;
    audio.preload = 'metadata';

    // 한 곡이 재생되면 다른 곡은 자동으로 멈춥니다.
    audio.addEventListener('play', () => {
      stopOtherSongs(audio);
      currentSong.textContent = song.title;
    });

    audio.addEventListener('ended', () => {
      currentSong.textContent = '아직 재생 중인 곡이 없습니다.';
    });

    audioPlayers.push(audio);
    songItem.append(title, audio);
    songList.appendChild(songItem);
  });
}

renderSongs();
