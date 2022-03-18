const pageDetails = document.querySelector(".page-details");
let musicData = JSON.parse(localStorage.getItem("heading"));
const mainPlayer = document.querySelector(".main-player");
const mainPlayIcon = document.querySelector(".main-play-icon");
const shuffleIcon = document.querySelector(".shuffle-icon");
const prevIcon = document.querySelector(".prev-icon");
const nextIcon = document.querySelector(".next-icon");
const repeatIcon = document.querySelector(".repeat-icon");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const mainProgress = document.querySelector(".main-progress");
const musicIcons = document.querySelector(".music-icons");
const progressBarLine = document.querySelector(".progressbar-line");
const progressBar = document.querySelector(".progressbar");
const mainVolume = document.querySelector(".volume-controls");
const volumeIcon = document.querySelector(".volume-icon");
const volumeArea = document.querySelector(".volume-area");
const volumeBar = document.querySelector(".volume-bar");
const body = document.querySelector(".body");
const fullScreen = document.querySelector(".full-screen");
const nav = document.querySelector(".nav");
const wrapper = document.querySelector(".wrapper");
const fullScreenIcon = document.querySelector(".fullscreen-icon");
const fullScreenIconMain = document.querySelector(".fullscreen-icon i");
const search = document.querySelector(".search");
const musicImg = document.querySelector(".music-img");
const imgInfo = document.querySelector(".imginfo");
const musicInfo = document.querySelector(".music-info");
const volumeAreaFullScreen = document.querySelector(".volume-area-full-screen");
const searchIconBig = document.querySelector(".search-icon-big");
const logo = document.querySelector(".logo");
const searchBar = document.querySelector(".searchbar");
const searchIcon = document.querySelector(".search-icon");

let details = "";
let text = "";
let key = 0;
let musicArr = [];
let isShuffling = false;
let isRepeating = false;
let Volume = 1;
let isFullScreen = false;
let isSizeSmall = false;
fullScreenIcon.addEventListener("click", () => {
    isFullScreen = !isFullScreen;
    let fullWidth = window.innerWidth;
    if(isFullScreen) {
        if(window.innerWidth < 655) {
            setVolumeIconSmallWidth();
        } 
        else {
            setVolumeIcon();
        }
        musicIcons.classList.add("some-icons");
        mainProgress.classList.add("main-progress-width");
        progressBar.classList.add("progressbarwidth");
        mainPlayer.classList.add("player");
        mainVolume.classList.add("volume-full-screen");
        fullScreenIcon.classList.add("less-screen-icon");
        fullScreenIcon.setAttribute("title", "Exit Full Screen");
        fullScreenIconMain.classList.replace("fa-expand", "fa-compress");
        nav.classList.add("not-show");
        wrapper.classList.add("not-show");
        body.classList.add("overflow");
        musicImg.classList.add("music-img-full-screen");
        fullScreen.style.display = "block";
        imgInfo.classList.add("imginfo-full-screen");
        musicInfo.classList.add("music-info-full-screen");
        shuffleIcon.classList.add("shuffle-full-screen");
        repeatIcon.classList.add("repeat-full-screen");
        volumeArea.classList.add("volume-area-full-screen");
    }
    else {
        musicIcons.classList.remove("some-icons");
        mainProgress.classList.remove("main-progress-width");
        progressBar.classList.remove("progressbarwidth");
        mainPlayer.classList.remove("player");
        mainVolume.classList.remove("volume-full-screen");
        fullScreenIcon.classList.remove("less-screen-icon");
        fullScreenIcon.setAttribute("title", "Full Screen");
        fullScreenIconMain.classList.replace("fa-compress", "fa-expand");
        nav.classList.remove("not-show")
        wrapper.classList.remove("not-show");
        body.classList.remove("overflow");
        fullScreen.style.display = "none";
        musicImg.classList.remove("music-img-full-screen");
        imgInfo.classList.remove("imginfo-full-screen");
        musicInfo.classList.remove("music-info-full-screen");
        shuffleIcon.classList.remove("shuffle-full-screen");
        repeatIcon.classList.remove("repeat-full-screen");
        volumeArea.classList.remove("volume-area-show");
        volumeArea.classList.remove("volume-area-full-screen");
    }
})

details = `<img src=${musicData.Img}  class="main-img" alt = "">
           <div class="main-info">
           <h2 class="main-subTitle">${musicData.Heading}: ${musicData.Genre}</h2>
           <button class="all-songs-button"><i class="fa-solid fa-play all-songs-icon"></i>Play Songs</button>
           <ul class=song-list></ul>
           </div>`
pageDetails.innerHTML = details;
const allSongsBtn = document.querySelector(".all-songs-button");
allSongsBtn.addEventListener("click", () => {
    mainPlayer.style.display = "block";
    startPlaying(idx);
});

const songList = document.querySelector(".song-list");
AllSongs.forEach(song => {
    if(song.heading.includes(musicData.Heading) && song.Genre.includes(musicData.Genre)) {
        key++;
        text += `<li class="song" key = ${key} src=${song.music}>
        <div class="image">
        <i class="fa-solid fa-play small-play-icon show-icon"></i>
        <div class="playing-animation">
        <div class="playing-icon-effect"></div>
        <div class="playing-icon-effect"></div>
        <div class="playing-icon-effect"></div>
        <div class="playing-icon-effect"></div>
        </div>
        <img src = "img/${song.img}" class="song-img" alt = "">
        </div>
        <div class="song-info">
        <p class="song-title">${song.title}</p>
        <p class="artist-name">${song.Artist}</p>
        </div>
        <div class="list">
        <i class="fa-solid fa-ellipsis-vertical more-icon"></i>
        <ul class="more-details">
            <li class="detail play-prev-btn">Play Previous Song</li>
            <li class="detail play-next-btn">Play Next Song</li>
        </ul>
        </div>
        </li>`
        musicArr.push(song);
    }
});
songList.innerHTML = text;
text = "";
const lists = document.querySelectorAll(".list");
const AllmoreDetails = document.querySelectorAll(".more-details");
function removeShowfromMoreDetails(moreDetails) {
    AllmoreDetails.forEach((moreDetail) => {
        if(moreDetails === moreDetail) {

        }
        else {
            moreDetail.classList.remove("show");
        }
    })
}
lists.forEach((list) => {
    const moreIcon = list.querySelector(".more-icon");
    const moreDetails = list.querySelector(".more-details");
    moreIcon.addEventListener("click", () => {
        removeShowfromMoreDetails(moreDetails);
        moreDetails.classList.toggle("show");
    });
})
const songs = document.querySelectorAll(".song");
const audio = document.querySelector(".audio");
const img = document.querySelector(".music-img img");
const musicName = document.querySelector(".music-name");
const musicArtist = document.querySelector(".music-artist");
let isPlaying = false;
let idx = 0;

function displaySongsAfterSearch() {
    songs.forEach((song)=> {
        song.style.display = "flex";
    })
}

search.addEventListener("input", (e) => {
    console.log(e.target.value);
    songs.forEach((song) => {
        const songTitle = song.querySelector(".song-title");
        let currentTitle = songTitle.textContent;
        if(currentTitle.includes(e.target.value) || currentTitle.toLowerCase().includes(e.target.value) || currentTitle.toUpperCase().includes(e.target.value)) {
            
        }
        else {
            song.style.display = "none";
        }
    }, displaySongsAfterSearch())
})

searchIconBig.addEventListener("click", () => {
    console.log("done");
    searchBar.classList.add("show-search");
    logo.style.display = "none";
    searchIconBig.classList.add("not-show");
});

searchIcon.addEventListener("click", () => {
    searchBar.classList.remove("show-search");
    logo.style.display = "inline-block";
    searchIconBig.classList.remove("not-show");
})

songs.forEach((song) => {
    let smallPlayIcon = song.querySelector(".small-play-icon");
    smallPlayIcon.addEventListener("click", () => {
        mainPlayer.style.display = "block"
        let key = song.getAttribute("key");
        console.log(key);
        idx = key-1;
        startPlaying(idx);
    });
    let playNextButton = song.querySelector(".play-next-btn");
    playNextButton.addEventListener("click", () => {
        mainPlayer.style.display = "block";
        let key = song.getAttribute("key");
        idx = key-1;
        playNextSong();
        removeShowfromMoreDetails();
    });
    let playPrevBtn = song.querySelector(".play-prev-btn");
    playPrevBtn.addEventListener("click", () => {
        mainPlayer.style.display = "block";
        let key = song.getAttribute("key");
        idx = key-1;
        playPrevSong();
        removeShowfromMoreDetails();
    })
})

mainPlayIcon.addEventListener("click", () => {
    if(isPlaying) {
        isPlaying = false;
        audio.pause();
        mainPlayIcon.classList.replace("fa-pause", "fa-play");
        setPlaying(idx);
    }
    else {
        isPlaying = true;
        mainPlayIcon.classList.replace("fa-play", "fa-pause");
        audio.play();        
        setPlaying(idx);
    }
})

prevIcon.addEventListener("click", playPrevSong);

function playPrevSong() {
    if(idx === 0) {
        idx = musicArr.length-1;
    }
    else {
        idx--;
    }
    startPlaying(idx);
}

nextIcon.addEventListener("click", playNextSong);

function playNextSong() {
    if(idx === musicArr.length-1) {
        idx = 0;
    }
    else {
        idx++;
    }
    startPlaying(idx);
}

shuffleIcon.addEventListener("click", () => {
    isShuffling = !isShuffling;
    if(isShuffling) {
        shuffleIcon.classList.add("active");
        repeatIcon.classList.remove("active");
    }
    else {
        shuffleIcon.classList.remove("active");
    }
    isRepeating = false;
})

repeatIcon.addEventListener("click", () => {
    isRepeating = !isRepeating;
    if(isRepeating) {
        repeatIcon.classList.add("active");
        shuffleIcon.classList.remove("active");
    }
    else {
        repeatIcon.classList.remove("active");
    }
    isShuffling = false;
})
audio.addEventListener("ended", () => {
    if(idx === musicArr.length-1) {
        idx = (idx%musicArr.length-1)-1;
    }
    if(isRepeating) {
        startPlaying(idx);
    }
    else if (isShuffling) {
        idx = Math.floor(Math.random(0, 1)*musicArr.length);
        startPlaying(idx);
    }
    else {
        idx++;
        startPlaying(idx);
    }
})

audio.addEventListener("timeupdate", (e) => {
    let currentDuration = e.target.currentTime;
    let duration = e.target.duration;
    progressBarLine.style.width = `${currentDuration/duration*100}%`;
    audio.addEventListener("loadeddata", () => {
        let audioDuration = audio.duration;
        let minDuration = Math.floor(audioDuration/60);
        let secDuration = Math.floor(audioDuration%60);
        if(secDuration < 10) {
            secDuration = `0${secDuration}`;
        }
        songDuration.innerHTML = `${minDuration}:${secDuration}`;
    })
    let currentMin = Math.floor(currentDuration/60);
        let currentSec = Math.floor(currentDuration%60);
        if(currentSec < 10) {
            currentSec = `0${currentSec}`;
        }
        currentTime.innerHTML = `${currentMin}:${currentSec}`;
})

progressBar.addEventListener("click", (e) => {
    let progressBarWidth = progressBar.clientWidth;
    let offSet = e.offsetX;
    let mainDuration = audio.duration;
    audio.currentTime = (offSet/progressBarWidth)*mainDuration;
})

volumeArea.addEventListener("click", (e) => {
    setVolume(e);
});

function setVolume(e) {
    let volumeBarWidth = Math.floor((e.offsetX/volumeArea.clientWidth)*100);
    console.log(volumeBarWidth);
    volumeBar.style.width = `${volumeBarWidth}%`
    audio.volume = volumeBarWidth/100;
    Volume = audio.volume;
    if(window.innerWidth < 655) {
        setVolumeIconSmallWidth();
    }
    else {
        setVolumeIcon();
    }
}

function setVolumeIcon() {
    let currentVolumeIcon = volumeIcon.classList[1];
    if(Volume === 0) {
        volumeIcon.classList.replace(currentVolumeIcon, "fa-volume-off");
    }
    else if(Volume < 0.5) {
        volumeIcon.classList.replace(currentVolumeIcon, "fa-volume-low");
    }
    else {
        volumeIcon.classList.replace(currentVolumeIcon, "fa-volume-high");
    }
}

function setVolumeIconSmallWidth() {
    let currentVolumeIcon = volumeIcon.classList[1];
    if(Volume === 0) {
        volumeIcon.classList.replace(currentVolumeIcon, "fa-volume-xmark");
    }
    else if(Volume <= 0.5) {
        volumeIcon.classList.replace(currentVolumeIcon, "fa-volume-low");
    }
    else {
        volumeIcon.classList.replace(currentVolumeIcon, "fa-volume-high");
    }
}
volumeIcon.addEventListener("click", () => {
    let fullWidth = window.innerWidth;
    if(isFullScreen) {
        volumeArea.classList.toggle("volume-area-show");
    }
    console.log("close");
    if(fullWidth < 655) {
        isSizeSmall = true;
    }
    else {
        isSizeSmall = false;
    }
    if(!isSizeSmall) {
        if(volumeIcon.classList.contains("fa-volume-xmark")) {
            volumeIcon.classList.replace("fa-volume-xmark", "fa-volume-high");
            audio.volume = Volume;
            setVolumeIcon();
        }
        else {
            let currentVolumeIcon = volumeIcon.classList[1];
            volumeIcon.classList.replace(currentVolumeIcon, "fa-volume-xmark");
            audio.volume = 0;
        }
    }
    else {
        setVolumeIconSmallWidth();
    }
})

const songLists = document.querySelectorAll(".song");
console.log(songLists);
function setPlaying(idx) {
    for(let i = 0; i < songLists.length; i++) {
        let playIcons = songLists[i].querySelector(".small-play-icon");
        let animationIcon = songLists[i].querySelector(".playing-animation");
        if(i === idx) {
            if(isPlaying) {
                animationIcon.style.display = "flex";
                playIcons.classList.remove("show-icon");
            }
            else {
                animationIcon.style.display = "none";
                playIcons.classList.add("show-icon");
            }
        }
        else {
            playIcons.classList.add("show-icon");
            animationIcon.style.display = "none";
        }
    }
}
function startPlaying(idx) {
    isPlaying = true;
    mainPlayIcon.classList.replace("fa-play", "fa-pause");
    let currentSong  = musicArr[idx];
    console.log(currentSong);
    fullScreen.style.background = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(img/${currentSong.img})`;
    audio.src = currentSong.music;
    img.src = `img/${currentSong.img}`;
    musicName.innerHTML = currentSong.title;
    musicArtist.innerHTML = currentSong.Artist;
    audio.play(); 
    setPlaying(idx);
}