let totalSongs = [
    {
        song: "./songs/Samar.mp3",
        artist: "Yuvan Shankar Raja",
        img: "./Images/sam.webp",
        move:"Azhagho Azhaghu"
    },
    {
        song: "./songs/Paiya - Poongatre.mp3",
        artist: "Yuvan shankar Raja",
        img: "./Images/pong",
        move:"Poongatre Poongatre"
    },
    {
        song: "./songs/Raja rani.mp3",
        artist: "G. V. Prakash",
        img: "./Images/raja.jpg",
        move:"Nee Yaro Song"
    },
    {
        song: "./songs/Kaappaan - Hey Amigo.mp3",
        artist: "Harris Jayaraj",
        img: "./Images/hey-amigo.jpg",
        move:"Hey Amigo"
    },
    {
        song: "./songs/Vadachennai.mp3",
        artist: "Anirudh Ravichander",
        img: "./Images/ohh penne.jpeg",
        move:"Oh Penne"
    },
    {
        song: "./songs/Iragai Poley.mp3",
        artist: "Yuvan Shankar Raja",
        img: "./Images/Iragai Pola.jpeg",
        move:"Iragai Pola"
    },
    {
        song: "./songs/Pirai Thedum.mp3",
        artist: "G. V. Prakash",
        img: "./Images/pirai thedum.jpeg",
        move:"Pirai Thedum"
    },
    {
        song: "./songs/3 - Po Nee Po.mp3",
        artist: "Anirudh Ravichander",
        img: "./Images/poo.jpeg",
        move:"Po Nee Po - The Pain of Love"
    },
    {
        song: "./songs/Engeyum Kaadhal .mp3",
        artist: "Harris Jayaraj",
        img: "./Images/engaihum kadhal.jpeg",
        move:"Engeyum Kadhal"
    },
    {
        song: "./songs/Minnalgal Koothadum.mp3",
        artist: "Bombay Jeyashree",
        img: "./Images/Minnagal.jpeg",
        move:"Minnalgal Koothadum"
    }
]
const images = document.querySelector("img")
const container = document.querySelector("audio")
const Musicer = document.querySelector("h1")
const myAudio = document.querySelector("audio")
const NextBtn = document.querySelector(".fa-forward-step")
const PreBtn = document.querySelector(".fa-backward-step")
let Playbtn = document.querySelector(".play")
let pauseBtn = document.querySelector(".pause")
let sufflle = document.querySelector(".fa-shuffle")
let volumes = document.querySelector(".range")
const buttons = document.querySelectorAll('i')
const durationEl = document.querySelector(".duration")
const current = document.querySelector(".current")
const total = document.querySelector(".total-time")
const volumeMute = document.querySelector(".sound")
const animation = document.querySelector("marquee")
const alertEL = document.querySelector("p")
let isPlaying = false;



function PauseAudio() {
    myAudio.pause();
}
function playAudio() {
    myAudio.play();
}
let counter = 0;
console.log(counter);



window.addEventListener("DOMContentLoaded",()=>{
    PlayNext()
    // Track()
    container.src = totalSongs[0].song
    images.src = totalSongs[0].img
    Musicer.innerText = totalSongs[0].artist
    animation.innerText = totalSongs[0].move
})
myAudio.onloadedmetadata = () => {
    durationEl.max = myAudio.duration
}

Playbtn.addEventListener("click",()=>{
    playAudio()
    Playbtn.style.display = "none";
    pauseBtn.style.display = "block"
    setInterval(() => {
                    durationEl.value = myAudio.currentTime
                    Track()
                }, 500)
})
pauseBtn.addEventListener("click",()=>{
    PauseAudio()
    pauseBtn.style.display = "none";
    Playbtn.style.display = "block";
})

volumeMute.addEventListener("click", () => {
    volumeMute.classList.toggle("shows")
    if(volumeMute.classList.contains("shows")){
        volumeMute.style.opacity = "0.5"
        myAudio.volume = 0
        displayAlert("red","volume muted")
    }else{
        myAudio.volume = 1
        volumeMute.style.opacity = "1.0"
        displayAlert("green","volume unmuted")
    }
})

NextBtn.addEventListener("click", () => {
    Track()
    counter++
    if (counter === totalSongs.length) {
        counter = 0;
    }
    NextPlayer(counter)
})
PreBtn.addEventListener("click", () => {
    Track()
    counter--
    if (counter === -1) {
        counter = totalSongs.length-1;
    }
    previousPlayer(counter)
})

sufflle.addEventListener("click", () => {
    playAudio()
    randomPlayer()
})
function PlayNext(){
    setInterval(()=>{
        if(myAudio.currentTime === myAudio.duration){
            counter++
            NextPlayer(counter)
        }
    },1000)
}
function NextPlayer(counter) {
    PlayNext()
    container.src = totalSongs[counter].song
    images.src = totalSongs[counter].img
    Musicer.innerText = totalSongs[counter].artist
    animation.innerText = totalSongs[counter].move
}

function previousPlayer(counter) {
    container.src = totalSongs[counter].song
    images.src = totalSongs[counter].img
    Musicer.innerText = totalSongs[counter].artist
    animation.innerText = totalSongs[counter].move
}

function randomPlayer() {
    let random = Math.floor(Math.random() * totalSongs.length - 1)
    console.log(random);
    container.src = totalSongs[random].song
    images.src = totalSongs[random].img
    Musicer.innerText = totalSongs[random].artist
}

function Track() {
    currentminutes = Math.floor(myAudio.currentTime / 60)
    currentseconds = Math.floor(myAudio.currentTime - (currentminutes * 60))

    durationMinutes = Math.floor(myAudio.duration / 60)
    durationSeconds = Math.floor(myAudio.duration - (durationMinutes * 60))

    if (currentseconds < 10) {
        currentseconds = "0" + currentseconds
        currentminutes = "0" + currentminutes
    }
    else if (currentseconds > 9) {
        currentminutes = "0" + currentminutes
    }
    current.innerText = `${currentminutes}:${currentseconds}`;
    total.innerText = `${durationMinutes}:${durationSeconds}`;
}

durationEl.addEventListener("input", () => {
    myAudio.currentTime = durationEl.value
    myAudio.play()
})

function displayAlert(color,text){
    alertEL.innerText = text
    alertEL.style.color = color
    setTimeout(()=>{
        alertEL.innerText = ""
        alertEL.style.color = ""
    },500)
}
