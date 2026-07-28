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


    function startGame() {
        if (audioCtx.state === "suspended") audioCtx.resume();
        sequence = [];
        level = 1;
        score = 0;
        playerStep = 0;
        gameActive = true;
        updateStatsUI();
        hideGameOverModal();
        startBtn.disabled = true;
        nextRound();
    }

    function nextRound() {
        playerStep = 0;
        sequence.push(randomColor());
        levelValueEl.textContent = level;
        centerText.textContent = "Watch...";
        statusText.textContent = `Level ${level} — watch the sequence`;
        playSequence();
    }

    async function playSequence() {
        isPlayingSequence = true;
        setPadsEnabled(false);

        await wait(500);
        for (const color of sequence) {
        await flashPad(color);
        await wait(180);
        }

        isPlayingSequence = false;
        setPadsEnabled(true);
        centerText.textContent = "Your Turn";
        statusText.textContent = "Your turn — repeat the sequence";
    }

    function setPadsEnabled(enabled) {
        pads.forEach((pad) => (pad.disabled = !enabled));
    }

    function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function handlePlayerInput(color) {
        if (!gameActive || isPlayingSequence) return;

        flashPad(color, 220);

        const expectedColor = sequence[playerStep];

        if (color === expectedColor) {
        playerStep++;


        if (playerStep === sequence.length) {
            score++;          
            level++;
            updateStatsUI();


            if ((level - 1) % 10 === 0 && level > 1) {
            launchConfetti();
            }

            statusText.textContent = "Correct! Get ready for the next round...";
            setTimeout(nextRound, 900);
        }
        } else {
        endGame();
        }
    }


    function endGame() {
        gameActive = false;
        setPadsEnabled(false);
        playErrorTone();
        triggerRedFlash();

        if (score > highScore) {
        highScore = score;
        localStorage.setItem("simonHighScore", String(highScore));
        }
        highScoreValueEl.textContent = highScore;

        centerText.textContent = "Game Over";
        statusText.textContent = "One wrong click ended the run!";
        startBtn.disabled = false;

        setTimeout(showGameOverModal, 500);
    }

    function triggerRedFlash() {
        flashOverlay.classList.add("active");
        setTimeout(() => flashOverlay.classList.remove("active"), 250);
    }

    function showGameOverModal() {
        finalScoreEl.textContent = score;
        finalHighScoreEl.textContent = highScore;
        gameOverModal.classList.add("show");
    }

    function hideGameOverModal() {
        gameOverModal.classList.remove("show");
    }

    function resetBoard() {
        sequence = [];
        playerStep = 0;
        level = 1;
        score = 0;
        gameActive = false;
        isPlayingSequence = false;
        updateStatsUI();
        centerText.textContent = "Press Start";
        statusText.textContent = 'Press "Start Game" to begin';
        setPadsEnabled(false);
        startBtn.disabled = false;
        hideGameOverModal();
    }


});