# My Music Player

GitHub Pages에서 바로 배포할 수 있는 개인용 정적 음악 플레이어입니다. 백엔드 없이 HTML, CSS, JavaScript만 사용하며, `music` 폴더에 넣은 오디오 파일을 앱 형태의 플레이어 UI로 재생합니다.

## 폴더 구조

```text
my-music-player/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── player.js
├── music/
│   ├── 01 트랙 1.flac
│   ├── 02 트랙 2.flac
│   └── ...
└── README.md
```

## 노래 추가 방법

1. `music` 폴더에 mp3 또는 flac 파일을 넣습니다.
2. `js/player.js` 파일의 `songs` 배열에 곡 정보를 추가합니다.

```javascript
const songs = [
  {
    title: "Song One",
    artist: "Unknown Artist",
    file: "./music/song1.mp3",
    cover: ""
  },
  {
    title: "Song Two",
    artist: "Unknown Artist",
    file: "./music/song2.mp3",
    cover: ""
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
  title: "Song One",
  artist: "Unknown Artist",
  file: "./music/song1.mp3",
  cover: "./covers/album-cover.jpg"
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
