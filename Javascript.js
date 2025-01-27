let hunger = 0;
let energy = 10;
let fun = 5;
let isSleeping = false;
let interval;

// Functie om een bericht aan de chat toe te voegen
function addChatMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const newMessage = document.createElement('div');
    newMessage.textContent = message;
    newMessage.classList.add('chat-message');
    chatBox.appendChild(newMessage);

    // Scroll automatisch naar de nieuwste boodschap
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Pas de status aan en toon berichten in de chat
function updateStatus() {
    const hungerFill = document.getElementById('hunger-fill');
    const hungerValue = document.getElementById('hunger-value');
    const energyFill = document.getElementById('energy-fill');
    const energyValue = document.getElementById('energy-value');
    const funFill = document.getElementById('fun-fill');
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

    // Emoji en chatbericht aanpassen
    if (isSleeping) {
        emoji.textContent = '😴';
        addChatMessage('Tamagotchi is in slaap gevallen.');
    } else if (funPercentage <= 30) {
        emoji.textContent = '🙁';
        addChatMessage('Tamagotchi is verdrietig.');
    } else if (energyPercentage <= 20) {
        emoji.textContent = '😪';
        addChatMessage('Tamagotchi is erg moe.');
    } else {
        emoji.textContent = '🙂';
        addChatMessage('Tamagotchi voelt zich blij.');
    }

    // Eindcondities controleren
    if (hunger >= 10) {
        alert('Je Tamagotchi is te hongerig en is verdwenen!');
        addChatMessage('Tamagotchi is verdwenen door honger.');
        clearInterval(interval);
        hunger = 0;
        updateStatus();
    }

    if (energy <= 0) {
        alert('Je Tamagotchi is te moe en kan niet meer bewegen!');
        addChatMessage('Tamagotchi is uitgeput.');
        clearInterval(interval);
    }

    if (fun <= 0) {
        alert('Je Tamagotchi is verdrietig en heeft geen plezier meer!');
        addChatMessage('Tamagotchi is gestopt met spelen.');
        clearInterval(interval);
    }
}

function feed() {
    hunger = Math.max(0, hunger - 2);
    addChatMessage('Je hebt Tamagotchi gevoerd.');
    updateStatus();
}

function play() {
    if (energy > 0) {
        hunger = Math.min(10, hunger + 1);
        energy = Math.max(0, energy - 2);
        fun = Math.min(10, fun + 2);
        addChatMessage('Je speelt met Tamagotchi.');
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
        addChatMessage('Tamagotchi is wakker.');
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

// Simuleer honger en plezier over tijd
interval = setInterval(() => {
    hunger++;
    energy = Math.max(0, energy - 1);
    fun = Math.max(0, fun - 1);
    updateStatus();
}, 10000);

updateStatus();
