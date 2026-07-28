document.addEventListener("DOMContentLoaded", ()=>{

    const pads = document.querySelectorAll(".pad-btn");
    const startBtn = document.getElementById("startBtn");
    const restartBtn = document.getElementById("restartBtn");
    const modalRestartBtn = document.getElementById("modalRestartBtn");
    const levelValueEl = document.getElementById("levelValue");
    const scoreValueEl = document.getElementById("scoreValue");
    const highScoreValueEl = document.getElementById("highScoreValue");
    const statusText = document.getElementById("statusText");
    const centerText = document.getElementById("centerText");
    const flashOverlay = document.getElementById("flashOverlay");
    const gameOverModal = document.getElementById("gameOverModal");
    const finalScoreEl = document.getElementById("finalScore");
    const finalHighScoreEl = document.getElementById("finalHighScore");
    const confettiCanvas = document.getElementById("confettiCanvas");

    const COLORS = ["red", "green", "blue", "yellow"];
    const KEY_MAP = { r: "red", g: "green", b: "blue", y: "yellow" };

    let sequence = [];    
    let playerStep = 0;        
    let level = 1;
    let score = 0;
    let highScore = Number(localStorage.getItem("simonHighScore")) || 0;
    let isPlayingSequence = false;
    let gameActive = false;      
    highScoreValueEl.textContent = highScore;


    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const TONE_FREQ = { red: 220.0, green: 277.18, blue: 329.63, yellow: 415.3 };

    function playTone(color, duration = 0.28) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.value = TONE_FREQ[color] || 300;
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }

    function playErrorTone() {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sawtooth";
        osc.frequency.value = 110;
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }


    function getPad(color) {
        return document.querySelector(`.pad-btn[data-color="${color}"]`);
    }

    function flashPad(color, duration = 400) {
        return new Promise((resolve) => {
        const pad = getPad(color);
        pad.classList.add("flash");
        playTone(color);
        setTimeout(() => {
            pad.classList.remove("flash");
            resolve();
        }, duration);
        });
    }

    function updateStatsUI() {
        levelValueEl.textContent = level;
        scoreValueEl.textContent = score;
    }

    function randomColor() {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

});