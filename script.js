/**
 * Battle Arena Web - Clash Royale Style Logic
 */

const characters = [
    {
        id: 1,
        nome: "Guerreiro",
        hp: 1500,
        maxHp: 1500,
        def: 50,
        img: "assets/warrior.png",
        skills: [
            { key: 'Q', nome: 'Espada de Elite', atkMin: 150, atkMax: 220, cost: 3, color: '#ff4d4d', shield: 0.2 },
            { key: 'W', nome: 'Escudo Justiceiro', atkMin: 100, atkMax: 150, cost: 4, color: '#00f2ff', shield: 0.6 },
            { key: 'E', nome: 'Fúria Real', atkMin: 350, atkMax: 500, cost: 7, color: '#ff8c00', shield: 0.1 }
        ]
    },
    {
        id: 2,
        nome: "Mago",
        hp: 900,
        maxHp: 900,
        def: 20,
        img: "assets/mage.png",
        skills: [
            { key: 'Q', nome: 'Seta de Gelo', atkMin: 200, atkMax: 300, cost: 3, color: '#4d94ff', shield: 0.1 },
            { key: 'W', nome: 'Barreira Arcana', atkMin: 150, atkMax: 200, cost: 5, color: '#00f2ff', shield: 0.7 },
            { key: 'E', nome: 'Relâmpago', atkMin: 600, atkMax: 800, cost: 9, color: '#8a2be2', shield: 0 }
        ]
    },
    {
        id: 3,
        nome: "Arqueiro",
        hp: 1100,
        maxHp: 1100,
        def: 30,
        img: "assets/archer.png",
        skills: [
            { key: 'Q', nome: 'Duo de Flechas', atkMin: 120, atkMax: 180, cost: 2, color: '#32cd32', shield: 0.1 },
            { key: 'W', nome: 'Esquiva Rápida', atkMin: 100, atkMax: 150, cost: 4, color: '#00f2ff', shield: 0.5 },
            { key: 'E', nome: 'Foguete Corredor', atkMin: 500, atkMax: 700, cost: 8, color: '#ffd700', shield: 0.2 }
        ]
    }
];

// Game State
let player = null;
let cpu = null;
let isBattleOver = false;
let isPlayerTurn = true;
let currentElixir = 5;
let playerShield = 0; // Current damage reduction
let cpuShield = 0;
const MAX_ELIXIR = 10;

// DOM Elements
const selectionScreen = document.getElementById('selection-screen');
const battleScreen = document.getElementById('battle-screen');
const characterGrid = document.getElementById('character-grid');
const skillsContainer = document.getElementById('skills-container');
const elixirBar = document.getElementById('elixir-bar');
const resetBtn = document.getElementById('reset-btn');
const overlayResetBtn = document.getElementById('overlay-reset-btn');
const resultOverlay = document.getElementById('result-overlay');
const resultText = document.getElementById('result-text');
const combatLog = document.getElementById('combat-log');

/**
 * Initialize Character Selection
 */
function initSelection() {
    characterGrid.innerHTML = '';
    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'char-card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${char.img}" alt="${char.nome}">
            </div>
            <div class="card-info">
                <h3>${char.nome}</h3>
                <div class="char-stats">
                    <span>HP: ${char.maxHp}</span> | <span>DEF: ${char.def}</span>
                </div>
            </div>
        `;
        card.onclick = () => selectCharacter(char.id);
        characterGrid.appendChild(card);
    });
}

/**
 * Handle Player Selection
 */
function selectCharacter(id) {
    const selected = characters.find(c => c.id === id);
    player = { ...selected, currentHp: selected.hp };

    const otherChars = characters.filter(c => c.id !== id);
    const cpuSelected = otherChars[Math.floor(Math.random() * otherChars.length)];
    cpu = { ...cpuSelected, currentHp: cpuSelected.hp };

    startBattle();
}

/**
 * Start Battle Interface
 */
function startBattle() {
    selectionScreen.classList.remove('active');
    selectionScreen.classList.add('hidden');
    battleScreen.classList.remove('hidden');
    isPlayerTurn = true;
    isBattleOver = false;
    currentElixir = 5;
    playerShield = 0;
    cpuShield = 0;

    document.getElementById('p-name').textContent = player.nome;
    document.getElementById('p-portrait').src = player.img;
    document.getElementById('c-name').textContent = cpu.nome;
    document.getElementById('c-portrait').src = cpu.img;

    renderSkills();
    updateHpBars();
    startElixirRegen();
}

function startElixirRegen() {
    const regen = setInterval(() => {
        if (isBattleOver) {
            clearInterval(regen);
            return;
        }
        if (currentElixir < MAX_ELIXIR) {
            currentElixir = Math.min(MAX_ELIXIR, currentElixir + 0.1);
            updateElixirUI();
        }
    }, 100);
}

function updateElixirUI() {
    elixirBar.style.width = (currentElixir / MAX_ELIXIR) * 100 + '%';
    // Check which cards are playable
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
        const skill = player.skills[index];
        card.disabled = !isPlayerTurn || currentElixir < skill.cost;
    });
}

/**
 * Render Skill Cards
 */
function renderSkills() {
    skillsContainer.innerHTML = '';
    player.skills.forEach(skill => {
        const card = document.createElement('button');
        card.className = 'skill-card';
        card.innerHTML = `
            <div class="elixir-cost">${skill.cost}</div>
            <div class="skill-icon" style="background-image: url('${player.img}')"></div>
            <span class="skill-card-name">${skill.nome}</span>
        `;
        card.onclick = () => handlePlayerAction(skill);
        skillsContainer.appendChild(card);
    });
}

/**
 * Keyboard Listeners
 */
window.addEventListener('keydown', (e) => {
    if (!isPlayerTurn || isBattleOver) return;
    const key = e.key.toUpperCase();
    const skill = player.skills.find(s => s.key === key);
    if (skill && currentElixir >= skill.cost) {
        e.preventDefault();
        handlePlayerAction(skill);
    }
}, true);

function handlePlayerAction(skill) {
    if (!isPlayerTurn || isBattleOver || currentElixir < skill.cost) return;

    currentElixir -= skill.cost;
    updateElixirUI();

    // Apply Shield for this turn
    playerShield = skill.shield;
    if (playerShield > 0) toggleShieldVisual('player', true);

    executeAttack(player, cpu, skill);

    if (checkWin()) return;

    // CPU Turn
    setTurn(false);
    setTimeout(() => {
        if (!isBattleOver) {
            const cpuSkill = cpu.skills[Math.floor(Math.random() * cpu.skills.length)];
            cpuShield = cpuSkill.shield;
            if (cpuShield > 0) toggleShieldVisual('cpu', true);

            executeAttack(cpu, player, cpuSkill);

            // Remove shields after the exchange
            toggleShieldVisual('player', false);
            toggleShieldVisual('cpu', false);
            playerShield = 0;
            cpuShield = 0;

            if (!checkWin()) setTurn(true);
        }
    }, 1200);
}

function toggleShieldVisual(type, show) {
    const el = document.querySelector(`.${type} .shield-vfx`);
    if (el) el.classList.toggle('shield-active', show);
}

function setTurn(playerTurn) {
    isPlayerTurn = playerTurn;
    updateElixirUI();
}

function executeAttack(attacker, defender, skill) {
    const rawAtk = Math.floor(Math.random() * (skill.atkMax - skill.atkMin + 1)) + skill.atkMin;

    // Apply current shield to damage
    const activeShield = defender === player ? playerShield : cpuShield;
    const reducedAtk = rawAtk * (1 - activeShield);
    const damage = Math.max(20, reducedAtk - defender.def);

    defender.currentHp = Math.max(0, defender.currentHp - damage);

    updateHpBars();

    const defenderEl = defender === player ? document.getElementById('player-fighter') : document.getElementById('cpu-fighter');
    createImpactFX(defenderEl, skill.color);
    triggerScreenEffects(defenderEl);
}

function createImpactFX(target, color) {
    const portraitContainer = target.querySelector('.fighter-img');

    // Flash white effect
    portraitContainer.classList.add('flash-white');
    setTimeout(() => portraitContainer.classList.remove('flash-white'), 300);

    // Particles
    const rect = portraitContainer.getBoundingClientRect();
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = color;
        particle.style.width = Math.random() * 8 + 4 + 'px';
        particle.style.height = particle.style.width;

        const tx = (Math.random() - 0.5) * 200 + 'px';
        const ty = (Math.random() - 0.5) * 200 + 'px';
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);

        particle.style.left = '50%';
        particle.style.top = '50%';

        portraitContainer.parentElement.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

function triggerScreenEffects(target) {
    target.classList.add('shake');
    document.body.classList.add('flash-white');
    setTimeout(() => {
        target.classList.remove('shake');
        document.body.classList.remove('flash-white');
    }, 500);
}

function updateHpBars() {
    const pPercent = (player.currentHp / player.maxHp) * 100;
    const cPercent = (cpu.currentHp / cpu.maxHp) * 100;

    document.getElementById('p-hp-bar').style.width = pPercent + '%';
    document.getElementById('c-hp-bar').style.width = cPercent + '%';
}

function checkWin() {
    if (cpu.currentHp <= 0) {
        victory("VITÓRIA!", true);
        return true;
    }
    if (player.currentHp <= 0) {
        victory("DERROTA!", false);
        return true;
    }
    return false;
}

function victory(msg, isWin) {
    isBattleOver = true;
    resultOverlay.classList.remove('hidden');
    resultText.textContent = isWin ? "VITÓRIA!" : "DERROTA!";
    resultText.className = isWin ? "victory-text" : "defeat-text";
}

function resetGame() {
    isBattleOver = false;
    player = null;
    cpu = null;
    battleScreen.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    selectionScreen.classList.remove('hidden');
    selectionScreen.classList.add('active');
}

resetBtn.onclick = resetGame;
overlayResetBtn.onclick = resetGame;

window.onload = initSelection;
