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

});