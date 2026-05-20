# My Music Player

GitHub Pages에서 바로 배포할 수 있는 개인용 정적 음악 플레이어입니다. 백엔드 없이 HTML, CSS, JavaScript만 사용하며, `music` 폴더에 넣은 오디오 파일을 앱 형태의 플레이어 UI로 재생합니다.

배포 주소: <https://seungyu57.github.io/music_player/>

## 폴더 구조

```text
my-music-player/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── player.js
├── covers/
│   ├── team-baby.webp
│   └── blackskirt.webp
├── music/
│   ├── 01 트랙 1.flac
│   ├── 02 트랙 2.flac
│   ├── ...
│   ├── EVERYTHING.flac
│   ├── 걱정하지마.flac
│   └── my-feet-dont-touch-the-ground/
│       ├── 01 트랙 1.flac
│       ├── 02 트랙 2.flac
│       └── ...
└── README.md
```

현재 플레이어는 두 앨범으로 나뉩니다.

- `TEAM BABY`: 기존 11곡, 커버 `covers/team-baby.webp`
- `My Feet Don't Touch The Ground`: 새 20곡, 커버 `covers/blackskirt.webp`

`TEAM BABY`의 마지막 원본 트랙은 앞부분 `00:00`부터 `04:54`까지 잘라 `EVERYTHING.flac`로 사용하고, `00:11:09`부터 끝까지 자른 구간은 `걱정하지마.flac`로 사용합니다.

## 플레이어 기능

- 앨범 목록에서 앨범을 선택해 플레이리스트를 전환할 수 있습니다.
- 앨범을 선택하면 해당 앨범의 트랙 목록이 펼쳐집니다.
- 재생/일시정지, 이전 곡, 다음 곡 버튼을 사용할 수 있습니다.
- 진행 바를 클릭하거나 드래그해서 원하는 위치로 이동할 수 있습니다.
- 볼륨 슬라이더로 음량을 조절할 수 있습니다.
- `반복 끔`, `전체 반복`, `한 곡 반복` 모드를 버튼으로 전환할 수 있습니다.
- 곡이 재생 중일 때 앨범 커버 뒤의 CD가 회전합니다.

## 노래 추가 방법

1. `music` 폴더에 mp3 또는 flac 파일을 넣습니다.
2. `js/player.js` 파일의 `albums` 배열에 앨범과 곡 정보를 추가합니다.

```javascript
const albums = [
  {
    title: "Album Title",
    artist: "검정치마",
    cover: "./covers/album-cover.webp",
    songs: [
      { title: "Song One", file: "./music/song1.mp3" },
      { title: "Song Two", file: "./music/song2.mp3" }
    ]
  }
];
```

`file` 경로는 `./music/파일명.mp3` 또는 `./music/파일명.flac`처럼 작성합니다. 파일명은 대소문자, 공백, 확장자까지 실제 파일명과 같아야 합니다.

## 커버 이미지 추가 방법

커버 이미지를 사용하려면 이미지 파일을 프로젝트 안에 넣고 `cover` 값에 경로를 작성합니다.

예시:

```text
my-music-player/
├── covers/
│   └── album-cover.jpg
└── js/
    └── player.js
```

```javascript
{
  title: "Album Title",
  artist: "검정치마",
  cover: "./covers/album-cover.jpg",
  songs: [
    { title: "Song One", file: "./music/song1.mp3" }
  ]
}
```

`cover` 값이 빈 문자열이면 기본 그라데이션 앨범 커버가 표시됩니다.

## 로컬에서 실행하기

별도 설치 없이 `index.html` 파일을 브라우저로 열면 됩니다.

```bash
cd my-music-player
```

그다음 파일 탐색기에서 `index.html`을 더블 클릭하거나 브라우저에 끌어다 놓습니다.

## GitHub Pages로 배포하기

1. GitHub에서 새 저장소를 만듭니다.
2. 아래 명령어로 프로젝트를 GitHub에 올립니다.

```bash
cd my-music-player
git init
git add .
git commit -m "Create static music player"
git branch -M main
git remote add origin https://github.com/사용자이름/저장소이름.git
git push -u origin main
```

3. GitHub 저장소 페이지에서 `Settings`로 이동합니다.
4. `Pages` 메뉴를 선택합니다.
5. `Build and deployment`에서 `Source`를 `Deploy from a branch`로 설정합니다.
6. Branch를 `main`, 폴더를 `/root`로 선택한 뒤 저장합니다.
7. 잠시 후 GitHub Pages 주소에서 음악 플레이어를 확인합니다.

## 주의사항

- 큰 오디오 파일은 GitHub 저장소에 올리기 적합하지 않습니다.
- 본인이 직접 만든 파일 또는 사용 권한이 있는 음악 파일만 사용해야 합니다.
- 공개 저장소에 올리면 오디오 파일도 공개될 수 있습니다.
- 브라우저마다 FLAC 지원 범위가 다를 수 있습니다. 모바일 호환성을 높이려면 mp3 사용을 권장합니다.
- GitHub Pages는 정적 사이트용이므로 서버 기능이 필요한 작업에는 적합하지 않습니다.
