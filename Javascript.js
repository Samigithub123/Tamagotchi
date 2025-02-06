let hunger = 0;
let energy = 10;
let fun = 5;
let isSleeping = false;
let interval;

// Voeg een bericht toe aan de chat
function addChatMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    newMessage.classList.add('chat-message');
    chatBox.appendChild(newMessage);

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Controleer of het spel game over is
function checkGameOver() {
    if (hunger >= 10) {
        showGameOver('Tamagotchi is gestorven door honger!');
        return true;
    }
    if (energy <= 0) {
        showGameOver('Tamagotchi heeft geen energie meer!');
        return true;
    }
    if (fun <= 0) {
        showGameOver('Tamagotchi werd te verdrietig!');
        return true;
    }
    return false;
}

// Toont het Game Over scherm
function showGameOver(message) {
    document.getElementById('game-over-message').textContent = message;
    document.getElementById('game-over-screen').classList.remove('hidden');
    clearInterval(interval); // Stop de game loop
}

// Start het spel opnieuw
function restartGame() {
    hunger = 0;
    energy = 10;
    fun = 5;
    isSleeping = false;

    document.getElementById('game-over-screen').classList.add('hidden');

    updateStatus();
    startGameLoop();
}

// Update de balken en emoji's
function updateStatus() {
    const hungerFill = document.getElementById('hunger-fill');
    const hungerValue = document.getElementById('hunger-value');
    const energyFill = document.getElementById('energy-fill');
    const energyValue = document.getElementById('energy-value');
    const funFill = document.getElementById('fun-fill');
    const funValue = document.getElementById('fun-value');
    const emoji = document.getElementById('emoji');

    hungerFill.style.width = `${hunger * 10}%`;
    hungerValue.textContent = `${hunger * 10}%`;

    energyFill.style.width = `${energy * 10}%`;
    energyValue.textContent = `${energy * 10}%`;

    funFill.style.width = `${fun * 10}%`;
    funValue.textContent = `${fun * 10}%`;

    if (checkGameOver()) return; // Controleer game over ná update

    if (isSleeping) {
        emoji.textContent = '😴';
        addChatMessage('Tamagotchi is in slaap gevallen.');
    } else if (fun <= 3) {
        emoji.textContent = '🙁';
        addChatMessage('Tamagotchi is verdrietig.');
    } else if (energy <= 2) {
        emoji.textContent = '😪';
        addChatMessage('Tamagotchi is erg moe.');
    } else {
        emoji.textContent = '🙂';
        addChatMessage('Tamagotchi voelt zich blij.');
    }
}

// Voer Tamagotchi
function feed() {
    hunger = Math.max(0, hunger - 2);
    addChatMessage('Je hebt Tamagotchi gevoerd.');
    updateStatus();
}

// Speel met Tamagotchi
function play() {
    if (energy > 0) {
        hunger = Math.min(10, hunger + 1);
        energy = Math.max(0, energy - 2);
        fun = Math.min(10, fun + 2);
        addChatMessage('Je speelt met Tamagotchi.');
        updateStatus();
    }
}

// Slaapfunctie
function toggleSleep() {
    const sleepButton = document.getElementById('sleep-button');
    const body = document.body;

    if (isSleeping) {
        isSleeping = false;
        sleepButton.textContent = 'Licht Uit';
        body.classList.remove('dark-mode');
        addChatMessage('Tamagotchi is wakker.');
        startGameLoop();
    } else {
        isSleeping = true;
        sleepButton.textContent = 'Licht Aan';
        body.classList.add('dark-mode');
        addChatMessage('Tamagotchi gaat slapen.');
        clearInterval(interval);
        const sleepInterval = setInterval(() => {
            if (!isSleeping) {
                clearInterval(sleepInterval);
                return;
            }
            energy = Math.min(10, energy + 1);
            updateStatus();
        }, 1000);
    }
}
function toggleMusic() {
    const music = document.getElementById("background-music");

    if (!music) {
        console.log("Audio-element niet gevonden!");
        return;
    }

    if (music.paused) {
        music.play().catch(error => console.log("Autoplay geblokkeerd:", error));
    } else {
        music.pause();
    }
}

// Start de game loop, met wachttijd voor de eerste tick
function startGameLoop() {
    clearInterval(interval);
    setTimeout(() => { // Wacht even voor eerste tick
        interval = setInterval(() => {
            hunger++;
            energy = Math.max(0, energy - 1);
            fun = Math.max(0, fun - 1);
            updateStatus();
        }, 10000);
    }, 5000); // Start pas na 5 seconden om direct game over te voorkomen
}

// Start het spel correct zonder direct game over
updateStatus();
startGameLoop();
