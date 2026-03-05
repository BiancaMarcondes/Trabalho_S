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
            { key: 'Q', nome: 'Lâmina Ametista', atkMin: 150, atkMax: 220, cost: 3, color: '#9b59b6', shield: 0.2 },
            { key: 'W', nome: 'Baluarte Real', atkMin: 100, atkMax: 150, cost: 4, color: '#8e44ad', shield: 0.8 },
            { key: 'E', nome: 'Impacto Roxo', atkMin: 350, atkMax: 500, cost: 7, color: '#bf94e4', shield: 0.1 }
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
            { key: 'Q', nome: 'Orbe Violeta', atkMin: 200, atkMax: 300, cost: 3, color: '#9b59b6', shield: 0.1 },
            { key: 'W', nome: 'Domínio Arcano', atkMin: 150, atkMax: 200, cost: 5, color: '#8e44ad', shield: 0.85 },
            { key: 'E', nome: 'Tempestade Roxa', atkMin: 600, atkMax: 800, cost: 9, color: '#663399', shield: 0 }
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
            { key: 'Q', nome: 'Flecha de Plasma', atkMin: 120, atkMax: 180, cost: 2, color: '#9b59b6', shield: 0.1 },
            { key: 'W', nome: 'Manto de Sombras', atkMin: 100, atkMax: 150, cost: 4, color: '#8e44ad', shield: 0.7 },
            { key: 'E', nome: 'Chuva Purpúrea', atkMin: 500, atkMax: 700, cost: 8, color: '#bf94e4', shield: 0.2 }
        ]
    },
    {
        id: 4,
        nome: "Bárbaro",
        hp: 1300,
        maxHp: 1300,
        def: 35,
        img: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=200&h=200&auto=format&fit=crop",
        skills: [
            { key: 'Q', nome: 'Fúria Púrpura', atkMin: 180, atkMax: 250, cost: 3, color: '#9b59b6', shield: 0.2 },
            { key: 'W', nome: 'Rugido Blindado', atkMin: 50, atkMax: 100, cost: 4, color: '#8e44ad', shield: 0.65 },
            { key: 'E', nome: 'Golpe Esmagador', atkMin: 400, atkMax: 600, cost: 8, color: '#663399', shield: 0.3 }
        ]
    },
    {
        id: 5,
        nome: "Paladino",
        hp: 1800,
        maxHp: 1800,
        def: 70,
        img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=200&h=200&auto=format&fit=crop",
        skills: [
            { key: 'Q', nome: 'Selo Sagrado', atkMin: 100, atkMax: 160, cost: 2, color: '#9b59b6', shield: 0.35 },
            { key: 'W', nome: 'Redenção Roxa', atkMin: 80, atkMax: 120, cost: 5, color: '#8e44ad', shield: 0.95 },
            { key: 'E', nome: 'Luz Ametista', atkMin: 300, atkMax: 450, cost: 7, color: '#bf94e4', shield: 0.45 }
        ]
    },
    {
        id: 6,
        nome: "Ninja",
        hp: 850,
        maxHp: 850,
        def: 15,
        img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=200&h=200&auto=format&fit=crop",
        skills: [
            { key: 'Q', nome: 'Kunai Sombria', atkMin: 150, atkMax: 200, cost: 2, color: '#9b59b6', shield: 0.15 },
            { key: 'W', nome: 'Névoa Violeta', atkMin: 250, atkMax: 350, cost: 5, color: '#8e44ad', shield: 0.75 },
            { key: 'E', nome: 'Execução Final', atkMin: 700, atkMax: 950, cost: 10, color: '#663399', shield: 0 }
        ]
    }
];

// Game State
let player = null;
let cpu = null;
let isBattleOver = false;
let playerElixir = 5;
let cpuElixir = 5;
let playerShield = 0;
let cpuShield = 0;
const MAX_ELIXIR = 10;

// DOM Elements
const selectionScreen = document.getElementById('selection-screen');
const battleScreen = document.getElementById('battle-screen');
const characterGrid = document.getElementById('character-grid');
const skillsContainer = document.getElementById('skills-container');
const pElixirBar = document.getElementById('elixir-bar');
const cElixirBar = document.getElementById('cpu-elixir-bar');
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
    isBattleOver = false;
    playerElixir = 5;
    cpuElixir = 5;
    playerShield = 0;
    cpuShield = 0;

    document.getElementById('p-name').textContent = player.nome;
    document.getElementById('p-portrait').src = player.img;
    document.getElementById('c-name').textContent = cpu.nome;
    document.getElementById('c-portrait').src = cpu.img;

    renderSkills();
    updateHpBars();
    startCombatLoops();
}

function startCombatLoops() {
    // Elixir Regeneration Loop
    const regen = setInterval(() => {
        if (isBattleOver) {
            clearInterval(regen);
            return;
        }

        if (playerElixir < MAX_ELIXIR) playerElixir = Math.min(MAX_ELIXIR, playerElixir + 0.15);
        if (cpuElixir < MAX_ELIXIR) cpuElixir = Math.min(MAX_ELIXIR, cpuElixir + 0.15);

        updateElixirUI();
    }, 100);

    // CPU AI Loop
    const cpuAction = setInterval(() => {
        if (isBattleOver) {
            clearInterval(cpuAction);
            return;
        }

        // Logical choice: use most expensive skill available
        const possibleSkills = cpu.skills.filter(s => cpuElixir >= s.cost);
        if (possibleSkills.length > 0) {
            const skill = possibleSkills.reduce((prev, current) => (prev.cost > current.cost) ? prev : current);
            handleCpuAction(skill);
        }
    }, 1500); // CPU checks for attacks every 1.5s
}

function updateElixirUI() {
    pElixirBar.style.width = (playerElixir / MAX_ELIXIR) * 100 + '%';
    cElixirBar.style.width = (cpuElixir / MAX_ELIXIR) * 100 + '%';

    // Check which cards are playable
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
        const skill = player.skills[index];
        card.disabled = playerElixir < skill.cost;
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
    if (isBattleOver) return;
    const key = e.key.toUpperCase();
    const skill = player.skills.find(s => s.key === key);
    if (skill && playerElixir >= skill.cost) {
        e.preventDefault();
        handlePlayerAction(skill);
    }
}, true);

function handlePlayerAction(skill) {
    if (isBattleOver || playerElixir < skill.cost) return;

    playerElixir -= skill.cost;
    updateElixirUI();

    // Apply Shield momentarily
    playerShield = skill.shield;
    toggleShieldVisual('player', true);
    setTimeout(() => {
        playerShield = 0;
        toggleShieldVisual('player', false);
    }, 1000);

    executeAttack(player, cpu, skill);
    checkWin();
}

function handleCpuAction(skill) {
    if (isBattleOver || cpuElixir < skill.cost) return;

    cpuElixir -= skill.cost;
    updateElixirUI();

    cpuShield = skill.shield;
    toggleShieldVisual('cpu', true);
    setTimeout(() => {
        cpuShield = 0;
        toggleShieldVisual('cpu', false);
    }, 1000);

    executeAttack(cpu, player, skill);
    checkWin();
}

function toggleShieldVisual(type, show) {
    const el = document.querySelector(`.${type} .shield-vfx`);
    if (el) {
        if (show) el.classList.add('shield-active');
        else el.classList.remove('shield-active');
    }
}

function setTurn(playerTurn) {
    isPlayerTurn = playerTurn;
    updateElixirUI();
}

function executeAttack(attacker, defender, skill) {
    const rawAtk = Math.floor(Math.random() * (skill.atkMax - skill.atkMin + 1)) + skill.atkMin;

    // Attack and Defend calculation (reduced by defender shield)
    const activeShield = (defender === player) ? playerShield : cpuShield;
    const damage = Math.max(20, (rawAtk * (1 - activeShield)) - defender.def);

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
