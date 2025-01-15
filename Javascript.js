let hunger = 0;
let energy = 10;
let fun = 5;
let isSleeping = false;
let interval;

function updateStatus() {
    const hungerFill = document.getElementById('hunger-fill');
    const hungerText = document.getElementById('hunger-text');
    const energyFill = document.getElementById('energy-fill');
    const energyText = document.getElementById('energy-text');
    const funFill = document.getElementById('fun-fill');
    const funText = document.getElementById('fun-text');
    const hungerValue = document.getElementById('hunger-value');
    const energyValue = document.getElementById('energy-value');
    const funValue = document.getElementById('fun-value');
    const emoji = document.getElementById('emoji');

    const hungerPercentage = Math.min(100, Math.max(0, hunger * 10));
    const energyPercentage = Math.min(100, Math.max(0, energy * 10));
    const funPercentage = Math.min(100, Math.max(0, fun * 10));

    hungerFill.style.width = `${hungerPercentage}%`;
    hungerValue.textContent = `${hungerPercentage}%`;

    energyFill.style.width = `${energyPercentage}%`;
    energyValue.textContent = `${energyPercentage}%`;

    funFill.style.width = `${funPercentage}%`;
    funValue.textContent = `${funPercentage}%`;

    // Emoji aanpassen op basis van slaap en plezier
    if (isSleeping) {
        emoji.textContent = '😴'; // Slapende emoji
    } else if (funPercentage <= 30) {
        emoji.textContent = '🙁'; // Verdrietige emoji bij lage plezier
    } else if (energyPercentage <= 20) {
        emoji.textContent = '😪'; // slaperige emoji bij lage energie
    } else {
        emoji.textContent = '🙂'; // Normale emoji
    }

    if (hunger >= 10) {
        alert('Je Tamagotchi is te hongerig en is verdwenen!');
        clearInterval(interval);
        hunger = 0;
        updateStatus();
    }

    if (energy <= 0) {
        alert('Je Tamagotchi is te moe en kan niet meer bewegen!');
        clearInterval(interval);
    }

    if (fun <= 0) {
        alert('Je Tamagotchi is verdrietig en heeft geen plezier meer!');
        clearInterval(interval);
    }
}

function feed() {
    hunger = Math.max(0, hunger - 2);
    updateStatus();
}

function play() {
    if (energy > 0) {
        hunger = Math.min(10, hunger + 1);
        energy = Math.max(0, energy - 2);
        fun = Math.min(10, fun + 2);
        updateStatus();
    }
}

function toggleSleep() {
    const sleepButton = document.getElementById('sleep-button');
    const body = document.body;

    if (isSleeping) {
        isSleeping = false;
        sleepButton.textContent = 'Licht Uit';
        body.classList.remove('dark-mode');
        interval = setInterval(() => {
            hunger++;
            energy = Math.max(0, energy - 1);
            fun = Math.max(0, fun - 1);
            updateStatus();
        }, 10000);
    } else {
        isSleeping = true;
        sleepButton.textContent = 'Licht Aan';
        body.classList.add('dark-mode');
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

// Simuleer honger en plezier over tijd
interval = setInterval(() => {
    hunger++;
    energy = Math.max(0, energy - 1);
    fun = Math.max(0, fun - 1);
    updateStatus();
}, 10000);

updateStatus();
