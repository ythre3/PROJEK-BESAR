const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'H00DBYAIR.mp3',
        displayName: 'H00DBYAIR',
        cover: 'H00DBYAIR.2.jpg',
        artist: 'Playboi Carti',
    },
    {
        path: 'yt1z.net - 4X4.mp3',
        displayName: '4x4',
        cover: '4x4.jpg',
        artist: 'Plby carter',
    },
    {
        path: 'type shii.mp3',
        displayName: 'Type Shit',
        cover: 'type shii.jpg',
        artist: 'Future, Metro Boomin, Travis Scott, Playboi Carti',
    },
    {
        path: '24song.mp3',
        displayName: '24 Song',
        cover: '24 song.jpg',
        artist: 'Playboi Carti',
    },
    {
        path: 'long time.mp3',
        displayName: 'Long Time',
        cover: 'long time.jpg',
        artist: 'Playboi Carti',
    },
    {
        path: 'lose you.mp3',
        displayName: 'LOSE YOU',
        cover: 'lose you.jpg',
        artist: 'Playboi Carti, The Weekend',
    },
    {
        path: 'TIMELESS.mp3',
        displayName: 'Timeless',
        cover: 'timeless.jpg',
        artist: 'Playboi Carti, The Weekend',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
